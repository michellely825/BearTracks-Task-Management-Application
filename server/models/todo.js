// Creates the model aka a JavaScript object that represents a MongoDB collection and gives you methods to interact with it
// the model allows you to do CRUD operations

// import mongoose
const mongoose = require("mongoose");

// defines a schema which mongoose enforces before data hits MongoDB
// allows for data validation
const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
  // user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
});

// creates the model which allows us to perform CRUD
// first arg is the model name (internal to Mongoose) which is usually singular and capitalized, second arg is defined schema; third arg is collection name which is usually plural and lowercase,
const Todo = mongoose.model("Todo", todoSchema, "todos");

// exports the model obj to be used in other files like server.js
module.exports = Todo;
