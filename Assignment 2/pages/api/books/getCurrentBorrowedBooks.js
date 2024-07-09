/*
 * WEB422 – Assignment 02
 * File: getCurrentBorrowedBooks.js
 * Name: Julia Alekseev Student ID: 051292134 Date: July 08, 2024
 */

// pages/api/books/getCurrentBorrowedBooks.js
import dbConnect from "../../../lib/dbConnect";
import { getCurrentBorrowedBooks } from "./bookService";

export default async function handler(req, res) {
  await dbConnect(); // connect to the database

  if (req.method === "GET") {
    try {
      // get currently borrowed books
      const transactions = await getCurrentBorrowedBooks();
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Error fetching transactions" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
