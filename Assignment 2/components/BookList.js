/*
 * WEB422 – Assignment 02
 * File: BookList.js
 * Name: Julia Alekseev Student ID: 051292134 Date: July 08, 2024
 */

import React, { useEffect, useState } from "react"; //import react and hooks
import { getBooks } from "../services/bookService"; //getting all books

const BookList = () => {
  const [books, setBooks] = useState([]); //init state for books

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const result = await getBooks(); //fetch books from the service
        setBooks(result.data); //set the fetched books to state
      } catch (error) {
        console.error("Error fetching books:", error); //handle errors
      }
    };

    fetchBooks(); //call the fetchBooks function
  }, []); //run the effect only once

  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {books.map((book) => (
          <li key={book.book_id}>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>ISBN: {book.ISBN}</p>
            <p>{book.brief_explanation}</p>
            <img src={book.photo_link} alt={book.title} />
            <p>{book.on_loan ? "On Loan" : "Available"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList; //export the BookList component
