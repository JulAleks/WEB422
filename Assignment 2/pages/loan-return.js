/*
 * WEB422 – Assignment 02
 * File: loan-return.js
 * Name: Julia Alekseev Student ID: 051292134 Date: July 08, 2024
 */

import { useState, useEffect } from "react"; // Importing useState and useEffect hooks from React
import axios from "axios"; // Importing axios for making HTTP requests
import { format } from "date-fns"; // Importing date-fns for date formatting
import dbConnect from "../lib/dbConnect"; // Importing dbConnect for database connection
import { getAllBooks, getCurrentBorrowedBooks } from "./api/books/bookService"; // Importing getAllBooks and getCurrentBorrowedBooks functions from book service
import { getAllUsers } from "./api/users/userService"; // Importing getAllUsers function from user service

const LoanReturnBook = ({
  initialUsers,
  initialBooks,
  initialBorrowedBooks,
}) => {
  const [users, setUsers] = useState(initialUsers || []); // Initializing state for users with initialUsers or an empty array
  const [books, setBooks] = useState(initialBooks || []); // Initializing state for books with initialBooks or an empty array
  const [borrowedBooks, setBorrowedBooks] = useState(
    initialBorrowedBooks || []
  ); // Initializing state for borrowedBooks with initialBorrowedBooks or an empty array
  const [userId, setUserId] = useState(""); // Initializing state for userId
  const [bookId, setBookId] = useState(""); // Initializing state for bookId
  const [date, setDate] = useState(""); // Initializing state for date
  const [action, setAction] = useState("loan"); // Initializing state for action with default value "loan"
  const [message, setMessage] = useState(""); // Initializing state for message

  useEffect(() => {
    // Using useEffect to perform side effects
    async function fetchData() {
      // Defining an asynchronous function to fetch data
      try {
        if (!initialUsers.length) {
          // If initialUsers is not provided, fetch users from the API
          const usersResponse = await axios.get("/api/users/getAllUsers");
          setUsers(usersResponse.data); // Setting the fetched users data to the state
        }
        if (!initialBooks.length) {
          // If initialBooks is not provided, fetch books from the API
          const booksResponse = await axios.get("/api/books/getAllBooks");
          setBooks(booksResponse.data); // Setting the fetched books data to the state
        }
        if (!initialBorrowedBooks.length) {
          // If initialBorrowedBooks is not provided, fetch borrowed books from the API
          const borrowedBooksResponse = await axios.get(
            "/api/books/getCurrentBorrowedBooks"
          );
          setBorrowedBooks(borrowedBooksResponse.data); // Setting the fetched borrowed books data to the state
        }
      } catch (error) {
        console.error("Error fetching data:", error); // Logging any errors that occur during fetching
      }
    }
    fetchData(); // Calling fetchData to fetch initial data
  }, [initialUsers, initialBooks, initialBorrowedBooks]); // Dependency array to run the effect when initialUsers, initialBooks, or initialBorrowedBooks change

  const handleSubmit = async (e) => {
    // Defining handleSubmit function to handle form submission
    e.preventDefault(); // Preventing default form submission behavior

    try {
      const response = await axios.post(`/api/books/${action}`, {
        // Making a POST request to the API for loaning or returning a book
        user_id: userId, // Sending userId
        book_id: bookId, // Sending bookId
        date, // Sending date
      });
      setMessage(`Book ${action}ed successfully`); // Setting success message
      const borrowedBooksResponse = await axios.get(
        "/api/books/getCurrentBorrowedBooks"
      );
      setBorrowedBooks(borrowedBooksResponse.data); // Updating borrowed books data
    } catch (error) {
      console.error(`Error ${action}ing book:`, error); // Logging any errors that occur during loaning or returning a book
      setMessage(`Error ${action}ing book: ${error.response.data.error}`); // Setting error message
    }
  };

  return (
    <div className="container">
      <h1>{action === "loan" ? "Loan" : "Return"} a Book</h1>
      <form onSubmit={handleSubmit}>
        {/* Form to handle loaning or returning a book */}
        <div className="form-group">
          <label htmlFor="userId">User</label>
          <select
            id="userId"
            className="form-control"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          >
            <option value="">Select a User</option>
            {users.map((user) => (
              <option key={user.user_id} value={user.user_id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="bookId">Book</label>
          <select
            id="bookId"
            className="form-control"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            required
          >
            <option value="">Select a Book</option>
            {books.map((book) => (
              <option key={book.book_id} value={book.book_id}>
                {book.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date">
            {action === "loan" ? "Reserve" : "Return"} Date
          </label>
          <input
            type="date"
            id="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {action === "loan" ? "Loan" : "Return"} Book
        </button>
      </form>
      {message && <p>{message}</p>} {/* Displaying success or error message */}
      <button
        onClick={() => setAction("loan")}
        className="btn btn-success mt-3"
      >
        Switch to Loan
      </button>
      <button
        onClick={() => setAction("return")}
        className="btn btn-danger mt-3"
      >
        Switch to Return
      </button>
      <div className="loan-book">
        <h2>Current Borrowed Books</h2>
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Book</th>
              <th>Borrow Date</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.map((transaction) => (
              <tr key={transaction.transaction_id}>
                <td>
                  {
                    users.find((user) => user.user_id === transaction.user_id)
                      ?.name
                  }
                </td>
                <td>
                  {
                    books.find((book) => book.book_id === transaction.book_id)
                      ?.title
                  }
                </td>
                <td>
                  {format(new Date(transaction.borrow_date), "yyyy-MM-dd")}{" "}
                  {/* Formatting the date */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanReturnBook;

export async function getServerSideProps() {
  // Defining the getServerSideProps function to fetch data server-side
  await dbConnect(); // Connecting to the database

  try {
    const users = await getAllUsers(); // Fetching all users from the database
    const books = await getAllBooks(); // Fetching all books from the database
    const borrowedBooks = await getCurrentBorrowedBooks(); // Fetching all borrowed books from the database
    return {
      props: {
        initialUsers: JSON.parse(JSON.stringify(users)), // Returning the fetched users as props
        initialBooks: JSON.parse(JSON.stringify(books)), // Returning the fetched books as props
        initialBorrowedBooks: JSON.parse(JSON.stringify(borrowedBooks)), // Returning the fetched borrowed books as props
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error); // Logging any errors that occur during fetching
    return {
      props: {
        initialUsers: [], // Returning an empty array if there is an error
        initialBooks: [], // Returning an empty array if there is an error
        initialBorrowedBooks: [], // Returning an empty array if there is an error
      },
    };
  }
}
