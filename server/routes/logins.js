const express = require("express");
const router = express.Router();
// const Login = require("../models/login");
const User = require("../models/user");
const bcrypt = require("bcrypt");

// log in
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = await User.find({ username });
    if (users.length === 0)
      return res.status(404).json({ error: "No user found" });
    for (const user of users) {
      console.log(user);
      if (await bcrypt.compare(password, user.hashedPassword)) {
        return res.status(200).json({ data: "Login success" });
      }
    }
    return res.status(401).json({ error: "Login failed: invalid credentials" });
    //   const isValid = await bcrypt.compare(password, user.hashedPassword);
    //   if (!isValid) {
    //     return res
    //       .status(401)
    //       .json({ error: "Login failed: invalid credentials" });
    //   } else {
    //     return res.status(200).json({ data: "Login success" });
    //   }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
