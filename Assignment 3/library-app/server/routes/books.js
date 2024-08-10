/*
 * WEB422 – Assignment 03
 * Name: Julia Alekseev Student ID: 051292134 Date: Aug 10, 2024
 */

// Import necessary libraries and modules
const express = require("express");
const router = express.Router();
const Book = require("../models/book"); // Import the Book model
const User = require("../models/User"); // Import the User model
const Transaction = require("../models/Transaction"); // Import the Transaction model
const dbConnect = require("../db"); // Import the database connection utility
const { v4: uuidv4 } = require("uuid"); // Import the uuidv4 function for generating unique IDs

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find(); // Fetch all books from the database
    res.json(books); // Send the list of books as a JSON response
    console.log(books);
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle errors by sending a 500 status code and error message
  }
});

// Get a single book
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id); // Fetch a book by its ID
    console.log(book);
    if (!book) {
      return res.status(404).json({ message: "Book not found" }); // Return 404 if the book is not found
    }
    res.json(book); // Send the book details as a JSON response
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle errors by sending a 500 status code and error message
  }
});

// Add a new book
router.post("/", async (req, res) => {
  const book = new Book({
    book_id: req.body.book_id,
    title: req.body.title,
    author: req.body.author,
    ISBN: req.body.ISBN,
    brief_explanation: req.body.brief_explanation,
    photo_link: req.body.photo_link,
    on_loan: false, // New books are not on loan
  });

  try {
    const newBook = await book.save(); // Save the new book to the database
    res.status(201).json(newBook); // Send the newly created book as a JSON response with 201 status code
  } catch (err) {
    res.status(400).json({ message: err.message }); // Handle errors by sending a 400 status code and error message
  }
});

// Delete a book
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ book_id: req.params.id }); // Find and delete the book by its ID
    if (!book) {
      return res.status(404).json({ message: "Book not found" }); // Return 404 if the book is not found
    }
    res.json({ message: "Book deleted" }); // Send a success message
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle errors by sending a 500 status code and error message
  }
});

// Get book details including transactions
router.get("/details/:id", async (req, res) => {
  await dbConnect(); // Ensure the database connection

  try {
    const book = await Book.findOne({ book_id: req.params.id }); // Fetch the book by its ID
    if (!book) {
      return res.status(404).json({ error: "Book not found" }); // Return 404 if the book is not found
    }
    console.log(book);
    res.status(200).json({ book, transactions }); // Send the book and its transactions as a JSON response*/
  } catch (error) {
    console.error("Error fetching book details:", error); // Log the error
    res.status(500).json({ error: error.message }); // Handle errors by sending a 500 status code and error message
  }
});

// Update a book
router.put("/:id", async (req, res) => {
  await dbConnect(); // Ensure the database connection

  try {
    const book = await Book.findOne({ book_id: req.params.id }); // Fetch the book by its ID
    if (!book) {
      return res.status(404).json({ message: "Book not found" }); // Return 404 if the book is not found
    }

    // Update book fields with new values if provided
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.ISBN = req.body.ISBN || book.ISBN;
    book.brief_explanation =
      req.body.brief_explanation || book.brief_explanation;
    book.photo_link = req.body.photo_link || book.photo_link;

    const updatedBook = await book.save(); // Save the updated book
    res.json(updatedBook); // Send the updated book as a JSON response
  } catch (err) {
    res.status(400).json({ message: err.message }); // Handle errors by sending a 400 status code and error message
  }
});

module.exports = router;
