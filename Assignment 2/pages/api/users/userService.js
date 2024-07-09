/*
 * WEB422 – Assignment 02
 * File: userService.js
 * Name: Julia Alekseev Student ID: 051292134 Date: July 08, 2024
 */
//get all users
import User from "../../../models/User"; //import the User model

//function to get all users
export const getAllUsers = async () => {
  try {
    //fetch all users from the DB
    const users = await User.find({});
    return users; //return the fetched users
  } catch (error) {
    console.error("Error fetching users:", error); //log any errors that occur
    throw new Error("Error fetching users"); //throw an error if fetching fails
  }
};

//function to get a user by ID
export const getUserById = async (userId) => {
  try {
    const user = await User.findOne({ user_id: userId }); // Find user by user_id
    return user; //return the fetched user
  } catch (err) {
    console.error("Error fetching user by ID:", err); //log any errors that occur
    throw new Error("Error fetching user by ID"); //throw an error if fetching fails
  }
};
