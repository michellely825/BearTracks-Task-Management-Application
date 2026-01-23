const express = require("express");
const bcrypt = require("bcrypt");
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
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hash", hashedPassword);
    console.log(username, password, hashedPassword, charInput);
    const user = await User.create({
      username,
      hashedPassword,
      charInput,
    });
    res.status(201).json({ user });
    console.log("Successfully added new user:", user);
  } catch (error) {
    res.status(500).json({ error: "POST /users error" });
  }
});

module.exports = router;
