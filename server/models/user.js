import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  charInput: { type: String, required: true },
});

const User = mongoose.model("User", userSchema, "users");

export default User;
