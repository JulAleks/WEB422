/*
 * WEB422 – Assignment 03
 * Name: Julia Alekseev Student ID: 051292134 Date: Aug 10, 2024
 */

// Import the Mongoose library
const mongoose = require("mongoose");

// Define a schema for the User model
const userSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true }, // Unique user ID, must be a string
  name: { type: String, required: true }, // Name of the user, must be a string and is required
  email: { type: String, required: true, unique: true }, // Unique email address, must be a string and is required
  role: { type: String, required: true }, // Role of the user, must be a string and is required
});

// Create a model for the User schema
const User = mongoose.model("User", userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
