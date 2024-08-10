/*
 * WEB422 – Assignment 03
 * Name: Julia Alekseev Student ID: 051292134 Date: Aug 10, 2024
 */

// Import the Mongoose library
const mongoose = require("mongoose");

// Define a schema for the Book model
const bookSchema = new mongoose.Schema({
  book_id: { type: Number, required: true, unique: true }, // Unique identifier for the book, must be a number
  title: { type: String, required: true }, // Title of the book, must be a string and is required
  author: { type: String, required: true }, // Author of the book, must be a string and is required
  ISBN: { type: String, required: true }, // International Standard Book Number, must be a string and is required
  brief_explanation: { type: String, required: true }, // Brief explanation of the book, must be a string and is required
  photo_link: { type: String, required: true }, // URL for the book's photo, must be a string and is required
  on_loan: { type: Boolean, required: true, default: false }, // Boolean indicating if the book is on loan, defaults to false
});

// Create a model for the Book schema
const Book = mongoose.model("Book", bookSchema);

// Export the Book model for use in other parts of the application
module.exports = Book;
