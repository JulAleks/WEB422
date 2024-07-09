/*
 * WEB422 – Assignment 02
 * File: admin.js
 * Name: Julia Alekseev Student ID: 051292134 Date: July 08, 2024
 */

import { useEffect, useState } from "react";
import axios from "axios";
import { getAllBooks } from "./api/books/bookService";
import dbConnect from "../lib/dbConnect";

// Main component to display and manage books
export default function Books({ books: initialBooks }) {
  const [books, setBooks] = useState(initialBooks || []); // State to hold books

  useEffect(() => {
    // Function to fetch books from the API
    async function fetchBooks() {
      try {
        const response = await axios.get("/api/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }

    // Fetch books if initialBooks is not provided
    if (!initialBooks) {
      fetchBooks();
    }
  }, [initialBooks]);

  // Function to handle the deletion of a book
  const handleDelete = async (bookId) => {
    if (confirm("Are you sure you want to delete this book?")) {
      try {
        // Send a DELETE request to the API
        await axios.delete("/api/books/delete", { data: { book_id: bookId } });
        // Update the state to remove the deleted book
        setBooks(books.filter((book) => book.book_id !== bookId));
      } catch (error) {
        console.error("Error deleting book:", error);
        alert("Error deleting book.");
      }
    }
  };

  return (
    <div className="contest-card">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h3>Admin</h3>
            <br />
            <a href="/add-book" className="btn btn-primary mb-3">
              Add new book
            </a>
          </div>
          {books.map((book) => (
            <div
              className="col-lg-3 col-sm-6 d-flex align-items-stretch"
              key={book._id}
            >
              <div
                className="card"
                style={{ width: "100%", marginBottom: "20px" }}
              >
                <img
                  className="card-img-top"
                  src={book.photo_link}
                  alt={`${book.title} image`}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{book.title}</h5>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <a
                      href={`/edit-book/${book.book_id}`}
                      className="btn btn-success mt-auto"
                      style={{ marginRight: "10px" }}
                    >
                      Edit
                    </a>
                    <button
                      onClick={() => handleDelete(book.book_id)}
                      className="btn btn-danger mt-auto"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Fetch initial book data from the server
export async function getServerSideProps() {
  await dbConnect();
  try {
    const books = await getAllBooks();
    return {
      props: {
        books: JSON.parse(JSON.stringify(books)),
      },
    };
  } catch (error) {
    console.error("Error fetching books:", error);
    return {
      props: {
        books: [],
      },
    };
  }
}
