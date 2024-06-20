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

    const quizCollection = client
      .db("shah_academy_quizDB")
      .collection("quizzes");

    // getting all quizzes and subject and class based quizzes
    app.get("/quizzes", async (req, res) => {
      console.log(req.query);
      if (req.query) {
        const result = await quizCollection
          .find({
            class: req.query.class,
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

    // getting single quiz with id

    app.get("/quizzes/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const quiz = await quizCollection.findOne(query);
      res.send(quiz);
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
