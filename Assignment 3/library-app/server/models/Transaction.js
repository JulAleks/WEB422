/*
 * WEB422 – Assignment 03
 * Name: Julia Alekseev Student ID: 051292134 Date: Aug 10, 2024
 */

// Import the Mongoose library
const mongoose = require("mongoose");

// Define a schema for the Transaction model
const transactionSchema = new mongoose.Schema({
  transaction_id: { type: Number, required: true, unique: true }, // Unique identifier for the transaction, must be a number
  user_id: { type: String, required: true }, // User ID involved in the transaction, must be a string
  book_id: { type: String, required: true }, // Book ID involved in the transaction, must be a string
  borrow_date: { type: Date, required: true }, // Date when the book was borrowed, must be a Date object
  return_date: { type: Date, default: null }, // Date when the book was returned, defaults to null if not yet returned
});

// Create a model for the Transaction schema
const Transaction = mongoose.model("Transaction", transactionSchema);

// Export the Transaction model for use in other parts of the application
module.exports = Transaction;
