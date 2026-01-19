const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { username, password, charInput } = req.body;
  //   console.log("New user:", req.body);
  //   res.status(201).json({ message: "User received" });
});

module.exports = router;
