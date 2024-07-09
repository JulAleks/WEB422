/*
 * WEB422 – Assignment 02
 * File: edit-book.js
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
      setMessage("Book Updated Successfully!");
    } catch (error) {
      console.error("Error Updating Book:", error);
      // if error, show error message
      setMessage("Error Updating Book.");
    }
  };

  return (
    <div className="container">
      <h1>Edit Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
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
          <label htmlFor="author">Author</label>
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
          <label htmlFor="isbn">ISBN</label>
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
          <label htmlFor="briefExplanation">Brief Explanation</label>
          <textarea
            id="briefExplanation"
            className="form-control"
            value={briefExplanation}
            onChange={(e) => setBriefExplanation(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="photoLink">Photo Link</label>
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
          <label htmlFor="onLoan">On Loan</label>
          <input
            type="checkbox"
            id="onLoan"
            checked={onLoan}
            onChange={(e) => setOnLoan(e.target.checked)}
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Update Book
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

// fetch the book data for the given id
export async function getServerSideProps(context) {
  const { id } = context.params;

  await dbConnect();

  const book = await Book.findOne({ book_id: id }).lean();
  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      book: JSON.parse(JSON.stringify(book)),
    },
  };
}
