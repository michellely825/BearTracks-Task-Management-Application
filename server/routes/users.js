const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Creates a new user
router.post("/", async (req, res) => {
  try {
    const { username, password, charInput } = req.body;
    if (!username || !password || !charInput) {
      return res.status(400).json({
        error: "Signup failed: Missing required info",
      });
    }
    const { username: name, charInput: char } = await User.create({
      username,
      password,
      charInput,
    });
    res.status(201).json({ username: name, charInput: char });
    console.log("hello server, new user incoming:", username, charInput);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error unfortunately" });
  }
});

module.exports = router;
