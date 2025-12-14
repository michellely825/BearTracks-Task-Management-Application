const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
  })
);

// Middleware to parse JSON body because Express can't do it automatically
app.use(express.json());

app.get("/", (req, res) => {
  res.send("bellooo");
});

app.post("/login", (req, res) => {
  console.log("logging in: ", req.body);
  // res.json(req.body.username);
  // console.log(req.body);
  // res.json({ name: req.body });
  // res.send(req.body);
});

app.post("/users", (req, res) => {
  console.log("creating a new user:", req.body);
});

app.listen(port, () => {
  console.log("michy's server is listening on port", port);
});
