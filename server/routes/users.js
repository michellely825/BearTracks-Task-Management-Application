const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Creates a new user
router.post("/", async (req, res) => {
  try {
    const { username, password, charInput } = req.body;
    if (!username || !password || !charInput) {
      return res.status(400).json({
        error: "Missing required info",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      const user = await User.create({
        username,
        hashedPassword,
        charInput,
      });
      const token = generateToken({ id: user._id, username: user.username });
      res.status(201).json({
        user: {
          id: user._id,
          username: user.username,
          charInput: user.charInput,
        },
        token,
      });
    } else {
      res
        .status(409)
        .json({ error: "Username already taken. Please try a different one." });
    }
  } catch (error) {
    res.status(500).json({ error: "POST /users error" });
  }
});

function generateToken(payload) {
  const idToken = jwt.sign(payload, process.env.ID_TOKEN_SECRET);
  return idToken;
}

module.exports = router;
