/*
 * WEB422 – Assignment 02
 * File: add-new.js
 * Name: Julia Alekseev Student ID: 051292134 Date: July 08, 2024
 */

import dbConnect from "../../../lib/dbConnect"; // Import the database connection function
import Book from "../../../models/Book"; // Import the Book model

export default async function handler(req, res) {
  try {
    await dbConnect(); // Connect to the database
    console.log("Database connection established");

    if (req.method === "POST") {
      const { title, author, ISBN, brief_explanation, photo_link } = req.body;

      // Find the last book ID
      const lastBook = await Book.findOne().sort({ book_id: -1 }).exec();
      const newBookId = lastBook ? lastBook.book_id + 1 : 1;

      // Create a new book
      const newBook = new Book({
        book_id: newBookId,
        title,
        author,
        ISBN,
        brief_explanation,
        photo_link,
      });

      await newBook.save();
      res.status(201).json({ message: "Book Added Successfully!" });
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (err) {
    console.error("Error adding book:", err);
    res.status(500).json({ error: "Server Error" });
  }
}
