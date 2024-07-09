/*
 * WEB422 – Assignment 02
 * File: books.js
 * Name: Julia Alekseev Student ID: 051292134 Date: July 08, 2024
 */
import { useEffect, useState } from "react"; // Importing useEffect and useState hooks from React
import axios from "axios"; // Importing axios for making HTTP requests
import { getAllBooks } from "./api/books/bookService"; // Importing getAllBooks function from the book service
import dbConnect from "../lib/dbConnect"; // Importing dbConnect for database connection

export default function Books({ books: initialBooks }) {
  // Defining the Books component which takes initialBooks as a prop
  const [books, setBooks] = useState(initialBooks || []); // Initializing state for books with initialBooks or an empty array

  useEffect(() => {
    // Using useEffect to perform side effects
    async function fetchBooks() {
      // Defining an asynchronous function to fetch books
      try {
        const response = await axios.get("/api/books"); // Making a GET request to fetch books
        setBooks(response.data); // Setting the fetched books data to the state
      } catch (error) {
        console.error("Error fetching books:", error); // Logging any errors that occur during fetching
      }
    }

    if (!initialBooks) {
      fetchBooks(); // If initialBooks is not provided, fetch books from the API
    }
  }, [initialBooks]); // Dependency array to run the effect when initialBooks changes

  return (
    <div className="contest-card">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h3>Books Waiting For You:</h3>
            <br />
          </div>
          {books.map((book) => (
            // Mapping through the books array to render each book
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
                  <p className="card-text">
                    <strong>Author:</strong> {book.author}
                    <br />
                    <strong>ISBN:</strong> {book.ISBN}
                    <br />
                    <strong>Availability:</strong>
                    <span
                      className={book.on_loan ? "text-danger" : "text-success"}
                    >
                      {book.on_loan ? <b> On loan</b> : <b> Available</b>}
                    </span>
                  </p>
                  <a
                    href={`/${book.book_id}`}
                    className="btn btn-primary mt-auto"
                  >
                    Read
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // Defining the getServerSideProps function to fetch data server-side
  await dbConnect(); // Connecting to the database
  try {
    const books = await getAllBooks(); // Fetching all books from the database
    return {
      props: {
        books: JSON.parse(JSON.stringify(books)), // Returning the fetched books as props
      },
    };
  } catch (error) {
    console.error("Error fetching books:", error); // Logging any errors that occur during fetching
    return {
      props: {
        books: [], // Returning an empty array if there is an error
      },
    };
  }
}
