/*
 * WEB422 – Assignment 02
 * File: [id].js
 * Name: Julia Alekseev Student ID: 051292134 Date: July 08, 2024
 */

import { useState } from "react";
import axios from "axios";
import dbConnect from "../../lib/dbConnect";
import Book from "../../models/Book";

// component to handle editing a book
export default function EditBook({ book }) {
  // setting up state variables for book fields
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [isbn, setIsbn] = useState(book.ISBN);
  const [briefExplanation, setBriefExplanation] = useState(
    book.brief_explanation
  );
  const [photoLink, setPhotoLink] = useState(book.photo_link);
  const [onLoan, setOnLoan] = useState(book.on_loan);
  const [message, setMessage] = useState("");

  // function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission behavior
    try {
      // sending post request to update the book
      await axios.post("/api/books/edit", {
        id: book.book_id,
        title,
        author,
        isbn,
        brief_explanation: briefExplanation,
        photo_link: photoLink,
        on_loan: onLoan,
      });
      // if successful, show success message
      setMessage("book updated successfully!");
    } catch (error) {
      console.error("error updating book:", error);
      // if error, show error message
      setMessage("error updating book.");
    }
  };

  return (
    <div className="container">
      <h1>edit book</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">author</label>
          <input
            type="text"
            id="author"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="isbn">isbn</label>
          <input
            type="text"
            id="isbn"
            className="form-control"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="briefExplanation">brief explanation</label>
          <textarea
            id="briefExplanation"
            className="form-control"
            value={briefExplanation}
            onChange={(e) => setBriefExplanation(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="photoLink">photo link</label>
          <input
            type="text"
            id="photoLink"
            className="form-control"
            value={photoLink}
            onChange={(e) => setPhotoLink(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="onLoan">on loan</label>
          <input
            type="checkbox"
            id="onLoan"
            checked={onLoan}
            onChange={(e) => setOnLoan(e.target.checked)}
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          update book
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

// fetch the book data for the given id
export async function getServerSideProps(context) {
  const { id } = context.params;

  await dbConnect(); // connect to the database

  const book = await Book.findOne({ book_id: id }).lean(); // find the book by id
  if (!book) {
    return {
      notFound: true, // return notFound if book not found
    };
  }

  return {
    props: {
      book: JSON.parse(JSON.stringify(book)), // pass book data as props
    },
  };
}
