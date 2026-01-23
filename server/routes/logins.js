const express = require("express");
const router = express.Router();
// const Login = require("../models/login");
const User = require("../models/user");
const bcrypt = require("bcrypt");

// log in
router.get("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = User.findOne({ username });
    if (!user) res.json("No user found");
    const hashedPassword = await bcrypt.hash(password);
  } catch (error) {}
});
