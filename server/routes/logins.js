import express from "express";
// import Login from "../models/login.js"; // if needed
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// TODO: handle unique usernames
// log in and creates a JWT token (with the user info)
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body; // destructures the json sent from the client
    const users = await User.find({ username });
    if (users.length === 0)
      return res.status(404).json({
        error:
          "Sorry, we couldn't find an account with that username. Please try again.",
      });
    for (const user of users) {
      if (await bcrypt.compare(password, user.hashedPassword)) {
        const token = generateToken({ id: user._id, username: user.username });
        return res.status(200).json({
          user: {
            id: user._id,
            username: user.username,
            charInput: user.charInput,
          },
          token,
        });
      }
    }
    return res
      .status(401)
      .json({ error: "Invalid credentials. Please try again." });
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
export default router;
