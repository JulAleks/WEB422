/*
 * WEB422 – Assignment 02
 * File: bookService.js
 * Name: Julia Alekseev Student ID: 051292134 Date: July 08, 2024
 */
import Book from "../../../models/Book"; // import the Book model
import Transaction from "../../../models/Transaction"; // import the Transaction model

// function to get all books
export const getAllBooks = async () => {
  try {
    // fetch all books from the DB
    const books = await Book.find({});
    return books; // return the fetched books
  } catch (error) {
    console.error("Error fetching books:", error); // log any errors that occur
    throw new Error("Error fetching books"); // throw an error if fetching fails
  }
};

// function to get a book by ID
export const getBookById = async (bookId) => {
  try {
    const book = await Book.findOne({ book_id: bookId }); // find book by book_id
    return book;
  } catch (err) {
    throw new Error("Error fetching book by ID:", err);
  }
};

// function to get currently borrowed books
export const getCurrentBorrowedBooks = async () => {
  try {
    // find books that are currently on loan
    const booksOnLoan = await Book.find({ on_loan: true }).exec();

    // extract book IDs from the books on loan
    const bookIds = booksOnLoan.map((book) => book.book_id);

    // find transactions where book_id is in the list of bookIds and return_date is null
    const transactions = await Transaction.find({
      book_id: { $in: bookIds },
      return_date: null,
    })
      .populate("book_id")
      .exec();

    return transactions;
  } catch (error) {
    console.error("Error fetching borrowed books:", error); // log any errors that occur
    throw new Error("Error fetching borrowed books"); // throw an error if fetching fails
  }
};
