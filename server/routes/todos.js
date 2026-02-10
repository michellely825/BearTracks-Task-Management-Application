// Handle all /todos API logic
const express = require("express");
const router = express.Router(); // router = mini Express app which allows the routes to be in their own files
const Todo = require("../models/todo"); // Imports todo Mongoose model which does CRUD
const jwt = require("jsonwebtoken");

// Create a new todo and saves user ID too
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { task } = req.body;
    if (!task)
      return res
        .status(400)
        .json({ error: "Adding todo failed: missing task" });
    const savedTask = await Todo.create({ task, user: req.user.id }); // creates a new document with the task and saves it to the todos collection
    console.log("Saved task successfully with user ID:", savedTask);

    res.status(201).json(savedTask); // sends the saved document back to the front end (so it can display it)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "POST /todos error" });
  }
});

// Get all tasks for the logged-in user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }); // returns an array
    res.json({ todos, username: req.user.username });
  } catch (error) {
    res.status(500).json({ error: "GET /todos error" });
  }
});

// Update task status or task content
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const todoID = req.params.id; // from the URL
    const updatedStatus = req.body.completed;
    console.log("status", updatedStatus);
    const updatedContent = req.body.task;
    const updates = {};
    if (updatedStatus !== undefined) updates.completed = updatedStatus;
    if (updatedContent !== undefined) updates.task = updatedContent;
    console.log("id", todoID);
    const updatedToDo = await Todo.findByIdAndUpdate(todoID, updates, {
      new: true, // return updated doc
      runValidators: true, // enforce schema rules
    });
    if (!updatedToDo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    console.log("updated todo:::", updatedToDo);
    res.status(200).json(updatedToDo);
  } catch (error) {
    res.status(500).json({ error: "PUT /todos/:id error" });
  }
});

// Delete a task
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const todoID = req.params.id;
    const deletedToDo = await Todo.findByIdAndDelete(todoID);
    if (!deletedToDo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json({ message: "Deleted!" });
  } catch (error) {
    res.status(500).json({ error: "DELETE /todos error" });
  }
});

// middleware function - checks that token is valid and adds user info to incoming request
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).json({ error: "no token" });

  jwt.verify(token, process.env.ID_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "token no longer valid" });
    req.user = user;
    next();
  });
}

module.exports = router;
