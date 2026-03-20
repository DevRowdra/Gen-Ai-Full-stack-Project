const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Name is required and cannot be empty"],
    required: true, // Ensures no two users have the same name
  },
  email: {
    type: String,
    required: [true, "Email is required and cannot be empty"],
    unique: true, // Ensures no two users have the same email
  },
  password: {
    type: String,
    required: [true, "Password is required and cannot be empty"],
  },
});

// Create the Model
const User = mongoose.model("User", userSchema);

module.exports = User;
