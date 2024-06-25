require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5007;

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kvwwfig.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    //to use into vercel this code should not be used
    // await client.connect();

    // all collections are :

    const db = client.db("shah_academy_quizDB");

    const quizCollection = db.collection("quizzes");
    const attendanceCollection = db.collection("attendance");

    // getting all quizzes and subject and class based quizzes
    app.get("/quizzes", async (req, res) => {
      if (req.query) {
        const result = await quizCollection
          .find({
            classIs: req.query.classIs,
            subject: req.query.subject,
          })
          .sort({ _id: -1 })
          .toArray();
        return res.send(result);
      } else {
        const result = await quizCollection.find().toArray();
        res.send(result);
      }
    });

    // creating a quiz

    app.post("/quizzes", async (req, res) => {
      const result = quizCollection.insertOne(req.body);
      res.send(result);
    });

    // getting single quiz with id

    app.get("/quizzes/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const quiz = await quizCollection.findOne(query);
      res.send(quiz);
    });

    // creating  single attendance of a quiz

    app.post("/attendance", async (req, res) => {
      const { email, quiz_id } = req.query;

      // checking the user is already attended the quiz

      const alreadyAttended = await attendanceCollection
        .find({
          quiz_id,
          attended_by: email,
        })
        .toArray();
      if (alreadyAttended.length > 0)
        return res.send({ message: "You Already Attended this quiz" });
      const quiz_attendance = req.body;
      const result = await attendanceCollection.insertOne(quiz_attendance);
      res.send(result);
    });

    // getting attendances of a user of quizzes

    app.get("/attendance", async (req, res) => {
      const { email, quiz_id } = req.query;
      const result = await attendanceCollection.findOne({
        attended_by: email,
        quiz_id,
      });

      res.send(result);
    });

    // getting attendances of a user by email

    app.get("/attendance/email/:email", async (req, res) => {
      console.log(req.params.email);
      const result = await attendanceCollection
        .find({
          attended_by: req.params.email,
        })
        .toArray();
      res.send(result);
    });

    // getting single attendance by id

    app.get("/attendance/id/:id", async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = await attendanceCollection.findOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("home route is running");
});

app.listen(port, () => {
  console.log(`server is running at the port ${port}`);
});
