/*
 * WEB422 – Assignment 02
 * File: delete.js
 * Name: Julia Alekseev Student ID: 051292134 Date: July 08, 2024
 */
import dbConnect from "../../../lib/dbConnect"; // Import the database connection function
import Book from "../../../models/Book"; // Import the Book model

// API handler to delete a book
export default async function handler(req, res) {
  await dbConnect(); // Connect to the database

  if (req.method === "DELETE") {
    const { book_id } = req.body; // Extract book_id from the request body

    try {
      // Find and delete the book by book_id
      const deletedBook = await Book.findOneAndDelete({ book_id });

      // If the book is not found, return 404 status with message
      if (!deletedBook) {
        return res
          .status(404)
          .json({ success: false, message: "Book not found" });
      }

      // If the book is deleted successfully, return 200 status with success message
      res.status(200).json({
        success: true,
        message: "Book deleted successfully",
      });
    } catch (error) {
      // Log the error and return 500 status with server error message
      console.error("Error deleting book:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  } else {
    // If the request method is not DELETE, return 405 status with method not allowed message
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}
