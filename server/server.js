const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
  })
);

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("bellooo");
  console.log("CONSOLE BITCH");
});

app.post("/users", (req, res) => {
  // res.json(req.body.username);
  // console.log(req.body);
  // res.json({ name: req.body });
  // res.send(req.body);
});

app.listen(port, () => {
  console.log("michy's server is listening on port", port);
});
