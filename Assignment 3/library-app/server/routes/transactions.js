/*
 * WEB422 – Assignment 03
 * Name: Julia Alekseev Student ID: 051292134 Date: Aug 10, 2024
 */

const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const Transaction = require("../models/Transaction"); // Import the Transaction model
const dbConnect = require("../db");

// Borrow a book
router.post("/borrow/:id", async (req, res) => {
  console.log("BorrowBook");
  await dbConnect(); // Ensure the database connection is established
  const { user_id, borrow_date } = req.body; // Extract user_id and borrow_date from the request body

  console.log(
    "Received borrow request for user_id:",
    user_id,
    "book_id:",
    req.params.id,
    "borrow_date:",
    borrow_date
  );

  try {
    // Find the last transaction to generate a new transaction ID
    const lastTrans = await Transaction.findOne()
      .sort({ transaction_id: -1 }) // Sort by transaction_id in descending order to get the last one
      .exec();
    const newTransId = lastTrans ? lastTrans.transaction_id + 1 : 1; // Increment the transaction ID or start with 1

    const book = await Book.findOne({ book_id: req.params.id }); // Find the book by book_id

    if (!book) {
      return res.status(404).json({ error: "Book not found" }); // Return 404 if the book is not found
    }

    if (book.on_loan) {
      return res.status(400).json({ error: "Book is already on loan" }); // Return 400 if the book is already on loan
    }

    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0); // Normalize currentDate to midnight UTC

    const borrowDate = new Date(borrow_date);
    borrowDate.setUTCHours(0, 0, 0, 0); // Normalize borrow_date to midnight UTC

    if (borrowDate < currentDate) {
      console.log("Borrow Date:", borrowDate, "Current Date:", currentDate); // Log the dates for debugging
      return res
        .status(400)
        .json({ error: "Cannot borrow a book retroactively" }); // Return 400 if the borrow date is in the past
    }

    // Create a new transaction
    const newTrans = new Transaction({
      transaction_id: newTransId, // Assign the generated transaction ID
      user_id: user_id, // Use the user_id from the request
      book_id: book.book_id, // Use the book_id from the book document
      borrow_date: borrowDate, // Use the normalized borrow date
    });

    console.log("New Transaction:", newTrans); // Log the new transaction for debugging

    await newTrans.save(); // Save the new transaction to the database

    // Mark the book as on loan
    book.on_loan = true;
    await book.save(); // Update the book document in the database

    res.status(200).json({ message: "Book borrowed successfully", book }); // Return success response
  } catch (error) {
    console.error("Error during book borrowing:", error); // Log the error
    res.status(500).json({ error: error.message }); // Return 500 status code with error message
  }
});

// Get active transaction for a book based on book ID
// Get active transaction for a book based on book ID
router.get("/borrow/:id", async (req, res) => {
  console.log("BorrowBookNull");
  await dbConnect(); // Ensure the database connection

  try {
    const bookId = req.params.id; // Keep book ID as a string
    console.log("Book ID from request:", bookId, "Type:", typeof bookId);

    // Fetch the active transaction where the book has not been returned
    const activeTransaction = await Transaction.findOne({
      book_id: bookId, // Query as a string to match the stored data
      return_date: null,
    }).populate("user_id"); // Populate the user details in the active transaction

    console.log("Active Transaction:", activeTransaction);

    if (!activeTransaction) {
      return res.status(404).json({ error: "Active transaction not found" }); // Return 404 if the active transaction is not found
    }

    res.status(200).json({ activeTransaction }); // Send the active transaction as a JSON response
  } catch (error) {
    console.error("Error fetching transaction details:", error); // Log the error
    res.status(500).json({ error: error.message }); // Handle errors by sending a 500 status code and error message
  }
});

// Return a book
router.post("/return/:id", async (req, res) => {
  console.log("ReturnBook");
  await dbConnect(); // Ensure the database connection
  const { user_id, return_date } = req.body; // Extract user_id and return_date from the request body

  try {
    const book = await Book.findOne({ book_id: req.params.id }); // Find the book by book_id

    if (!book) {
      return res.status(404).json({ error: "Book not found" }); // Return 404 if the book is not found
    }

    if (!book.on_loan) {
      return res.status(400).json({ error: "Book is not currently on loan" }); // Return 400 if the book is not on loan
    }

    const transaction = await Transaction.findOne({
      book_id: req.params.id,
      user_id: user_id,
      return_date: null,
    }); // Find the open transaction for the given book_id and user_id

    console.log("Active Transaction:", transaction);

    if (!transaction) {
      return res
        .status(400)
        .json({ error: "No open transaction for this book and user is found" }); // Return 400 if no open transaction is found
    }

    // Check if the return date is before the borrow date
    if (new Date(transaction.borrow_date) > new Date(return_date)) {
      return res
        .status(400)
        .json({ error: "Cannot return book before borrowing date" }); // Return 400 if return date is before borrow date
    }

    transaction.return_date = new Date(return_date); // Set the return date
    await transaction.save(); // Save the updated transaction to the database

    // Mark the book as not on loan
    book.on_loan = false;
    await book.save(); // Update the book document in the database

    res.status(200).json({ message: "Book returned successfully", book }); // Return success response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Return 500 status code with error message
  }
});

module.exports = router;
