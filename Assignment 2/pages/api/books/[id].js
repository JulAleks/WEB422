/*
 * WEB422 – Assignment 02
 * File: [id].js
 * Name: Julia Alekseev Student ID: 051292134 Date: July 08, 2024
 */

import dbConnect from "../../../lib/dbConnect";
import Book from "../../../models/Book";

// api handler to update a book
export default async function handler(req, res) {
  await dbConnect(); // connect to the database

  if (req.method === "POST") {
    // extract data from the request body
    const { id, title, author, ISBN, brief_explanation, photo_link, on_loan } =
      req.body;

    try {
      // find the book by id and update it with new data
      const updatedBook = await Book.findOneAndUpdate(
        { book_id: id },
        { title, author, ISBN, brief_explanation, photo_link, on_loan },
        { new: true } // return the updated book
      );

      // if the book is not found, return 404 status
      if (!updatedBook) {
        return res
          .status(404)
          .json({ success: false, message: "book not found" });
      }

      // if the book is updated successfully, return 200 status with success message
      res.status(200).json({
        success: true,
        message: "book updated successfully",
        book: updatedBook,
      });
    } catch (error) {
      // log the error and return 500 status with server error message
      console.error("error updating book:", error);
      res.status(500).json({ success: false, error: "server error" });
    }
  } else {
    // if the request method is not POST, return 405 status with method not allowed message
    res.status(405).json({ success: false, error: "method not allowed" });
  }
}
