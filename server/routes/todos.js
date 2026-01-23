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
        .json({ error: "Adding todo failed: missing task" });
    const savedTask = await Todo.create({ task }); // creates a new document with the task and saves it to the todos collection
    console.log("Saved task:", savedTask);

    res.status(201).json(savedTask); // sends the saved document back to the front end (so it can display it)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "POST /todos error" });
  }
});

// Get all tasks (not fully implemented yet)
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({}).populate("user", "username"); // populate() allows every todo to come with username now
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "GET /todos error" });
  }
});

module.exports = router;
