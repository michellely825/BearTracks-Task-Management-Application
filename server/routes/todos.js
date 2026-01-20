// Handle all /todos API logic
const express = require("express");
const router = express.Router(); // router = mini Express app which allows the routes to be in their own files
const Todo = require("../models/todo"); // Imports todo Mongoose model which does CRUD

// Create a new todo
router.post("/", async (req, res) => {
  try {
    const { task } = req.body;
    if (!task)
      return res
        .status(400)
        .json({ error: "Bad request, missing task which is required" });
    const savedTask = await Todo.create({ task }); // creates a new document with the task and saves it to the todos collection
    console.log("Saved task:", savedTask);

    res.status(201).json(savedTask); // sends the saved document back to the front end (so it can display it)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error unfortunately" });
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await Todo.find({});
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "server error unfortunately" });
  }
});

module.exports = router;

// router.get("/", (req, res) => {
//   res.send("bellooo");
// });

// router.post("/login", (req, res) => {
//   console.log("logging in: ", req.body);
// });
