const express = require("express");
const router = express.Router();

// new user
router.post("/", async (req, res) => {
  try {
    const { username, password, charInput } = req.body;
    if (!username || !password || !chartInput) {
      return res
        .status(400)
        .json({ error: "Bad request, missing required info" });
    }
    // const newUser = await
    console.log("New user:", req.body);
    res.status(201).json({ message: "User received" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error unfortunately" });
  }
});

module.exports = router;
