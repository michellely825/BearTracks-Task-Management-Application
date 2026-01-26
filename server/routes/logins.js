const express = require("express");
const router = express.Router();
// const Login = require("../models/login");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// TODO: handle unique usernames
// log in and creates a JWT token (with the user info)
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body; // destructures the json sent from the client
    const users = await User.find({ username });
    if (users.length === 0)
      return res.status(404).json({ error: "No user found" });
    for (const user of users) {
      if (await bcrypt.compare(password, user.hashedPassword)) {
        const token = generateToken({ id: user._id, username: user.username });
        return res
          .status(200)
          .json({
            user: {
              id: user._id,
              username: user.username,
              charInput: user.charInput,
            },
            token,
          }); //TODO: // sends the username and token back to frontend
      }
    }
    return res.status(401).json({ error: "Login failed: invalid credentials" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

function generateToken(payload) {
  const token = jwt.sign(payload, process.env.ID_TOKEN_SECRET);
  return token;
}

// export router
module.exports = router;
