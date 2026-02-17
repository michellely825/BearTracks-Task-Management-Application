// starts the server, configures milldeware and connects to MongoDB

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import todoRoutes from "./routes/todos.js";
import userRoutes from "./routes/users.js";
import loginRoutes from "./routes/logins.js";

// Middleware
const app = express();
const port = 3000;
app.use(
  cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
  })
);

// JSON → JS object
app.use(express.json()); // parses JSON body because Express can't do it automatically

// Set up MongoDB connection
const MONGO_URI =
  "mongodb+srv://lym8:UCIanteater2023@michellecluster.uly06nc.mongodb.net/todos_db";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected DB:", mongoose.connection.name);
    app.listen(port, () => {
      console.log("Connected server on port:", port);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// mount the routers aka whenever a route starts with "__", send it to __Routes
app.use("/todos", todoRoutes);
app.use("/users", userRoutes);
app.use("/login", loginRoutes);
