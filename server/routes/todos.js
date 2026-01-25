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

// Get all tasks for the specific user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json({ username: req.user.username, todos }); // TODO:
  } catch (error) {
    res.status(500).json({ error: "GET /todos error" });
  }
});

// Update a task
router.put("/", (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: "PUT /todos error" });
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
