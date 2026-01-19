const express = require("express");
const router = express.Router();
const todoModel = require("../models/todo");

router.post("/", async (req, res) => {
  try {
    const { task } = req.body;
    if (!task)
      return res
        .status(400)
        .json({ error: "Bad request, missing task which is required" });

    const savedTask = await todoModel.create({ task }); // creates a new document with the task
    console.log("Saved task:", savedTask);

    res.status(201).json(savedTask); // document is sent back the saved task
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error unfortunately" });
  }
});

router.get("/", async (req, res) => {
  try {
    const tasks = await todoModel.find({});
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
