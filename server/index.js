require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

const clientOrigins = (process.env.CLIENT_URLS || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: clientOrigins,
  })
);
app.use(express.json({ limit: "5mb" }));

const adminEmails = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

const firebaseProjectId = process.env.FIREBASE_PROJECT_ID;
const firebaseClientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(
  /\\n/g,
  "\n"
);

const isFirebaseConfigured =
  Boolean(firebaseProjectId) &&
  Boolean(firebaseClientEmail) &&
  Boolean(firebasePrivateKey);

if (isFirebaseConfigured && admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: firebaseProjectId,
      clientEmail: firebaseClientEmail,
      privateKey: firebasePrivateKey,
    }),
  });
} else if (!isFirebaseConfigured) {
  console.warn(
    "Firebase Admin credentials are missing. Auth-protected routes will return 500 until configured."
  );
}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kvwwfig.mongodb.net/?retryWrites=true&w=majority`;

const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const createVerifyFirebaseToken = () => {
  return async (req, res, next) => {
    try {
      if (!isFirebaseConfigured) {
        return res.status(500).send({
          message: "Firebase Admin is not configured on the server.",
        });
      }

      const authorization = req.headers.authorization;
      if (!authorization?.startsWith("Bearer ")) {
        return res.status(401).send({ message: "Unauthorized access." });
      }

      const token = authorization.split(" ")[1];
      const decoded = await admin.auth().verifyIdToken(token);
      req.decoded = decoded;
      next();
    } catch (error) {
      return res.status(401).send({
        message: "Unauthorized access.",
        error: error.message,
      });
    }
  };
};

const verifyFirebaseToken = createVerifyFirebaseToken();

async function run() {
  try {
    const db = mongoClient.db("shah_academy_quizDB");
    const quizCollection = db.collection("quizzes");
    const attendanceCollection = db.collection("attendance");
    const usersCollection = db.collection("users");

    await usersCollection.createIndex({ uid: 1 }, { unique: true });
    await usersCollection.createIndex({ email: 1 }, { unique: true });

    const findUserFromToken = async (decoded) => {
      return usersCollection.findOne({
        $or: [{ uid: decoded.uid }, { email: decoded.email }],
      });
    };

    const verifyActiveUser = async (req, res, next) => {
      const user = await findUserFromToken(req.decoded);

      if (!user) {
        return res.status(404).send({ message: "User profile not found." });
      }

      if (user.status === "inactive") {
        return res.status(403).send({ message: "Your account is inactive." });
      }

      req.dbUser = user;
      next();
    };

    const verifyAdmin = async (req, res, next) => {
      const user = await findUserFromToken(req.decoded);

      if (!user) {
        return res.status(404).send({ message: "User profile not found." });
      }

      if (user.role !== "admin") {
        return res.status(403).send({ message: "Forbidden access." });
      }

      req.dbUser = user;
      next();
    };

    const normalizeQuizPayload = (payload = {}) => {
      const quizzes = Array.isArray(payload.quizzes)
        ? payload.quizzes
            .map((quizItem, index) => ({
              number: index + 1,
              question: quizItem?.question?.trim?.() || "",
              options: Array.isArray(quizItem?.options)
                ? quizItem.options.map((option) => String(option || "").trim())
                : [],
              answer: String(quizItem?.answer || "").trim(),
            }))
            .filter(
              (quizItem) =>
                quizItem.question &&
                quizItem.options.length === 4 &&
                quizItem.options.every(Boolean) &&
                quizItem.answer
            )
        : [];

      return {
        classIs: String(payload.classIs || "").trim(),
        subject: String(payload.subject || "").trim(),
        paper: String(payload.paper || "").trim(),
        chapter_name: String(payload.chapter_name || "").trim(),
        chapter: Number(payload.chapter),
        quizzes,
      };
    };

    app.get("/quizzes", async (req, res) => {
      const query = {};

      if (req.query.classIs) {
        query.classIs = req.query.classIs;
      }

      if (req.query.subject) {
        query.subject = req.query.subject;
      }

      const result = await quizCollection.find(query).sort({ _id: -1 }).toArray();
      res.send(result);
    });

    app.post("/quizzes", verifyFirebaseToken, verifyAdmin, async (req, res) => {
      const normalizedQuiz = normalizeQuizPayload(req.body);

      if (
        !normalizedQuiz.classIs ||
        !normalizedQuiz.subject ||
        !normalizedQuiz.paper ||
        !normalizedQuiz.chapter_name ||
        !Number.isFinite(normalizedQuiz.chapter) ||
        normalizedQuiz.quizzes.length < 3
      ) {
        return res.status(400).send({ message: "Invalid quiz payload." });
      }

      const quizDoc = {
        ...normalizedQuiz,
        createdAt: new Date(),
        createdBy: {
          uid: req.dbUser.uid,
          email: req.dbUser.email,
          name: req.dbUser.name,
        },
      };

      const result = await quizCollection.insertOne(quizDoc);
      res.send(result);
    });

    app.get("/quizzes/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const quiz = await quizCollection.findOne(query);
      res.send(quiz);
    });

    app.patch(
      "/quizzes/:id",
      verifyFirebaseToken,
      verifyAdmin,
      async (req, res) => {
        const normalizedQuiz = normalizeQuizPayload(req.body);

        if (
          !normalizedQuiz.classIs ||
          !normalizedQuiz.subject ||
          !normalizedQuiz.paper ||
          !normalizedQuiz.chapter_name ||
          !Number.isFinite(normalizedQuiz.chapter) ||
          normalizedQuiz.quizzes.length < 3
        ) {
          return res.status(400).send({ message: "Invalid quiz payload." });
        }

        const query = { _id: new ObjectId(req.params.id) };
        const updates = {
          ...normalizedQuiz,
          updatedAt: new Date(),
          updatedBy: {
            uid: req.dbUser.uid,
            email: req.dbUser.email,
            name: req.dbUser.name,
          },
        };

        await quizCollection.updateOne(query, { $set: updates });
        const updatedQuiz = await quizCollection.findOne(query);
        res.send(updatedQuiz);
      }
    );

    app.delete(
      "/quizzes/:id",
      verifyFirebaseToken,
      verifyAdmin,
      async (req, res) => {
        const quizId = req.params.id;
        const query = { _id: new ObjectId(quizId) };

        const quiz = await quizCollection.findOne(query);
        if (!quiz) {
          return res.status(404).send({ message: "Quiz not found." });
        }

        await attendanceCollection.deleteMany({ quiz_id: quizId });
        await quizCollection.deleteOne(query);

        res.send({ message: "Quiz deleted successfully." });
      }
    );

    app.post("/users", verifyFirebaseToken, async (req, res) => {
      const { name, className = "", provider = "password", photoURL = "" } =
        req.body || {};

      const email = req.decoded.email;
      if (!email) {
        return res.status(400).send({ message: "Email is required." });
      }

      const existingUser = await findUserFromToken(req.decoded);
      const normalizedEmail = email.toLowerCase();
      const role =
        existingUser?.role ||
        (adminEmails.includes(normalizedEmail) ? "admin" : "user");
      const status = existingUser?.status || "active";
      const now = new Date();

      const userDoc = {
        uid: req.decoded.uid,
        name: name || req.decoded.name || existingUser?.name || "Unknown User",
        email: normalizedEmail,
        className: existingUser?.className || className || "",
        role,
        status,
        provider,
        photoURL: existingUser?.photoURL || photoURL || req.decoded.picture || "",
        updatedAt: now,
      };

      await usersCollection.updateOne(
        { uid: req.decoded.uid },
        {
          $set: userDoc,
          $setOnInsert: {
            createdAt: now,
          },
        },
        { upsert: true }
      );

      const savedUser = await usersCollection.findOne({ uid: req.decoded.uid });
      res.send(savedUser);
    });

    app.get("/users/me", verifyFirebaseToken, async (req, res) => {
      const user = await findUserFromToken(req.decoded);

      if (!user) {
        return res.status(404).send({ message: "User profile not found." });
      }

      res.send(user);
    });

    app.patch("/users/me", verifyFirebaseToken, async (req, res) => {
      const allowedUpdates = {};

      if (typeof req.body.name === "string" && req.body.name.trim()) {
        allowedUpdates.name = req.body.name.trim();
      }

      if (typeof req.body.className === "string") {
        allowedUpdates.className = req.body.className.trim();
      }

      if (typeof req.body.photoURL === "string") {
        allowedUpdates.photoURL = req.body.photoURL.trim();
      }

      allowedUpdates.updatedAt = new Date();

      await usersCollection.updateOne(
        { uid: req.decoded.uid },
        {
          $set: allowedUpdates,
        }
      );

      const updatedUser = await usersCollection.findOne({ uid: req.decoded.uid });
      res.send(updatedUser);
    });

    app.get("/users", verifyFirebaseToken, verifyAdmin, async (req, res) => {
      const users = await usersCollection
        .find()
        .sort({ createdAt: -1 })
        .toArray();
      res.send(users);
    });

    app.patch(
      "/users/:id",
      verifyFirebaseToken,
      verifyAdmin,
      async (req, res) => {
        const query = { _id: new ObjectId(req.params.id) };
        const targetUser = await usersCollection.findOne(query);

        if (!targetUser) {
          return res.status(404).send({ message: "User not found." });
        }

        const isSelfEdit = targetUser.uid === req.decoded.uid;

        if (isSelfEdit) {
          const hasBlockedSelfUpdate =
            (typeof req.body.name === "string" &&
              req.body.name.trim() !== (targetUser.name || "").trim()) ||
            req.body.role !== undefined ||
            req.body.status !== undefined;

          if (hasBlockedSelfUpdate) {
            return res.status(400).send({
              message: "You can only update your own class here.",
            });
          }
        }

        const allowedRoles = ["admin", "user"];
        const allowedStatuses = ["active", "inactive"];
        const updates = {
          updatedAt: new Date(),
        };

        if (typeof req.body.name === "string" && req.body.name.trim()) {
          updates.name = req.body.name.trim();
        }

        if (typeof req.body.className === "string") {
          updates.className = req.body.className.trim();
        }

        if (!isSelfEdit && allowedRoles.includes(req.body.role)) {
          updates.role = req.body.role;
        }

        if (!isSelfEdit && allowedStatuses.includes(req.body.status)) {
          updates.status = req.body.status;
        }

        await usersCollection.updateOne(query, { $set: updates });
        const updatedUser = await usersCollection.findOne(query);
        res.send(updatedUser);
      }
    );

    app.delete(
      "/users/:id",
      verifyFirebaseToken,
      verifyAdmin,
      async (req, res) => {
        const query = { _id: new ObjectId(req.params.id) };
        const userToDelete = await usersCollection.findOne(query);

        if (!userToDelete) {
          return res.status(404).send({ message: "User not found." });
        }

        if (userToDelete.uid === req.decoded.uid) {
          return res
            .status(400)
            .send({ message: "You cannot delete your own account here." });
        }

        await attendanceCollection.deleteMany({
          $or: [
            { attended_by: userToDelete.email?.toLowerCase() },
            { user_uid: userToDelete.uid },
          ],
        });

        await usersCollection.deleteOne(query);

        if (isFirebaseConfigured && userToDelete.uid) {
          try {
            await admin.auth().deleteUser(userToDelete.uid);
          } catch (error) {
            if (error.code !== "auth/user-not-found") {
              throw error;
            }
          }
        }

        res.send({ message: "User deleted successfully." });
      }
    );

    app.post(
      "/attendance",
      verifyFirebaseToken,
      verifyActiveUser,
      async (req, res) => {
        const quizId = req.query.quiz_id;
        const email = req.decoded.email?.toLowerCase();

        if (!quizId) {
          return res.status(400).send({ message: "quiz_id is required." });
        }

        const alreadyAttended = await attendanceCollection.findOne({
          quiz_id: quizId,
          attended_by: email,
        });

        if (alreadyAttended) {
          return res
            .status(409)
            .send({ message: "You already attended this quiz." });
        }

        const quizAttendance = {
          attended_by: email,
          user_uid: req.decoded.uid,
          quiz_id: quizId,
          answers: Array.isArray(req.body.answers) ? req.body.answers : [],
          submittedAt: new Date(),
        };

        const result = await attendanceCollection.insertOne(quizAttendance);
        res.send(result);
      }
    );

    app.get(
      "/attendance",
      verifyFirebaseToken,
      verifyActiveUser,
      async (req, res) => {
        const quizId = req.query.quiz_id;
        const email = req.decoded.email?.toLowerCase();

        const result = await attendanceCollection.findOne({
          attended_by: email,
          quiz_id: quizId,
        });

        res.send(result);
      }
    );

    app.get(
      "/attendance/me",
      verifyFirebaseToken,
      verifyActiveUser,
      async (req, res) => {
        const email = req.decoded.email?.toLowerCase();

        const attendanceList = await attendanceCollection
          .find({ attended_by: email })
          .sort({ submittedAt: -1 })
          .toArray();

        const quizIds = attendanceList
          .map((attendance) => attendance.quiz_id)
          .filter((quizId) => ObjectId.isValid(quizId))
          .map((quizId) => new ObjectId(quizId));

        const quizzes = quizIds.length
          ? await quizCollection.find({ _id: { $in: quizIds } }).toArray()
          : [];

        const quizMap = new Map(
          quizzes.map((quiz) => [quiz._id.toString(), quiz])
        );

        const result = attendanceList.map((attendance) => {
          const matchedQuiz = quizMap.get(attendance.quiz_id);
          const correctCount = Array.isArray(attendance.answers)
            ? attendance.answers.reduce(
                (count, answer) => count + (answer.result ? 1 : 0),
                0
              )
            : 0;

          return {
            ...attendance,
            correctCount,
            totalQuestions: Array.isArray(attendance.answers)
              ? attendance.answers.length
              : 0,
            quiz: matchedQuiz
              ? {
                  _id: matchedQuiz._id,
                  title: matchedQuiz.title || matchedQuiz.chapter_name || "Untitled Quiz",
                  classIs: matchedQuiz.classIs,
                  subject: matchedQuiz.subject,
                  chapter: matchedQuiz.chapter,
                  chapter_name: matchedQuiz.chapter_name,
                }
              : null,
          };
        });

        res.send(result);
      }
    );

    app.get(
      "/attendance/email/:email",
      verifyFirebaseToken,
      verifyAdmin,
      async (req, res) => {
        const result = await attendanceCollection
          .find({
            attended_by: req.params.email.toLowerCase(),
          })
          .toArray();
        res.send(result);
      }
    );

    app.get(
      "/attendance/id/:id",
      verifyFirebaseToken,
      verifyAdmin,
      async (req, res) => {
        const query = { _id: new ObjectId(req.params.id) };
        const result = await attendanceCollection.findOne(query);
        res.send(result);
      }
    );

    await mongoClient.db("admin").command({ ping: 1 });
    console.log("MongoDB connected successfully.");
  } finally {
    // Keeping the client connection open for the app lifetime.
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("home route is running");
});

app.listen(port, () => {
  console.log(`server is running at the port ${port}`);
});
