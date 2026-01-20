const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Creates a new user
router.post("/", async (req, res) => {
  try {
    const { username, password, charInput } = req.body;
    if (!username || !password || !charInput) {
      return res
        .status(400)
        .json({ error: "Bad request, missing required info" });
    }
    const newUser = await User.create({ username, password, charInput });
    console.log("new user", newUser);
    res.status(201).json({ message: "User received", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error unfortunately" });
  }
});

module.exports = router;
