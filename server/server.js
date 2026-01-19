// Imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const todoRoutes = require("./routes/todos");
const userRoutes = require("./routes/users");

// Middleware
const app = express();
const port = 3000;
app.use(
  cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
  })
);
app.use(express.json()); // parses JSON body because Express can't do it automatically

// Set up MongoDB connection
const MONGO_URI =
  "mongodb+srv://lym8:UCIanteater2023@michellecluster.uly06nc.mongodb.net/todos_db";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected DB:", mongoose.connection.name);
    app.listen(port, () => {
      console.log("hi bitch michy's server is listening on port", port);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/todos", todoRoutes);
app.use("/users", userRoutes);

// test route
app.get("/", (req, res) => res.send("bellooo"));
