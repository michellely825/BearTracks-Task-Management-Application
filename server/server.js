const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://lym8:UCIanteater2023@michellecluster.uly06nc.mongodb.net/todos_db";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected DB:", mongoose.connection.name);
    console.log("MongoDB Atlas connected successfully!!!");
    app.listen(port, () => {
      console.log("hi bitch michy's server is listening on port", port);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const todoModel = mongoose.model("todos", todoSchema, "todos");

// async function testInsert() {
//   const doc = await todoModel.create({ task: "Test direct insert" });
//   console.log(doc);
//   mongoose.disconnect();
//   // const allTasks = await todoModel.find({});
//   // console.log("All tasks in collection:", allTasks);
// }

// testInsert();

app.use(
  cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
  })
);

// Middleware to parse JSON body because Express can't do it automatically
app.use(express.json());

app.get("/", (req, res) => {
  res.send("bellooo");
});

app.post("/login", (req, res) => {
  console.log("logging in: ", req.body);
  // res.json(req.body.username);
  // console.log(req.body);
  // res.json({ name: req.body });
  // res.send(req.body);
});

app.post("/todos", async (req, res) => {
  console.log("POST /todos hit", req.body); // <--- very important
  try {
    const { task } = req.body;
    if (!task) return res.status(400).json({ error: "Task is required" });

    const savedTask = await todoModel.create({ task }); // creates a new document with the task
    console.log("Saved task:", savedTask);

    res.status(201).json(savedTask); // document is sent back the saved task
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error unfortunately" });
  }
  // console.log("adding this task to db: ", task);
});

app.post("/users", (req, res) => {
  const { username, password, charInput } = req.body;
});
