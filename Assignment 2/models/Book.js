/*
 * WEB422 – Assignment 02
 * File: Book.js
 * Name: Julia Alekseev Student ID: 051292134 Date: July 08, 2024
 */
//book schema
import mongoose from "mongoose"; //import mongoose for MongoDB operations

//define the book schema with various fields and their constraints
const bookSchema = new mongoose.Schema({
  book_id: { type: Number, required: true, unique: true }, //unique book ID
  title: { type: String, required: true }, //book title
  author: { type: String, required: true }, //book author
  ISBN: { type: String, required: true }, //book ISBN
  brief_explanation: { type: String, required: true }, //brief explanation of the book
  photo_link: { type: String, required: true }, //link to the book's photo
  on_loan: { type: Boolean, required: true, default: false }, //loan status
});

//create the Book model if it doesn't already exist, otherwise use the existing model
const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);

export default Book; //export the Book model
