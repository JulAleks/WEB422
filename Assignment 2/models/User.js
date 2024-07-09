/*
 * WEB422 – Assignment 02
 * File: User.js
 * Name: Julia Alekseev Student ID: 051292134 Date: July 08, 2024
 */
//user schema
import mongoose from "mongoose"; //import mongoose for MongoDB operations

//define the user schema with various fields and their constraints
const userSchema = new mongoose.Schema({
  user_id: { type: Number, required: true, unique: true }, //unique user ID
  name: { type: String, required: true }, //name of the user
  email: { type: String, required: true, unique: true }, //unique email address
  role: { type: String, required: true }, //role of the user
});

//create the User model if it doesn't already exist, otherwise use the existing model
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User; //export the User model
