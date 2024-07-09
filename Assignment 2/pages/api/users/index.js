/*
 * WEB422 – Assignment 02
 * File: idndex.js
 * Name: Julia Alekseev Student ID: 051292134 Date: July 08, 2024
 */
import dbConnect from "../../../lib/dbConnect"; // import the database connection function
import User from "../../../models/User"; // import the User model

// api handler to fetch users
export default async function handler(req, res) {
  await dbConnect(); // connect to the database

  if (req.method === "GET") {
    try {
      // fetch all users from the database
      const users = await User.find({});
      // return the fetched users with a 200 status
      res.status(200).json(users);
    } catch (error) {
      // if there's an error, return a 500 status with an error message
      res.status(500).json({ error: "failed to fetch users" });
    }
  } else {
    // if the request method is not GET, return a 405 status with a method not allowed message
    res.status(405).json({ error: "method not allowed" });
  }
}
