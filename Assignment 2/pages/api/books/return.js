/*
 * WEB422 – Assignment 02
 * File: return.js
 * Name: Julia Alekseev Student ID: 051292134 Date: July 08, 2024
 */
import dbConnect from "../../../lib/dbConnect"; //import the database connection function
import Book from "../../../models/Book"; //import the Book model
import Transaction from "../../../models/Transaction"; //import the Transaction model

export default async function handler(req, res) {
  //connect to the database
  await dbConnect();

  if (req.method === "POST") {
    const { user_id, book_id, date } = req.body; //extract the user_id, book_id, and date from the request body

    try {
      //find an outstanding transaction where the book has not been returned yet
      const transaction = await Transaction.findOne({
        user_id,
        book_id,
        return_date: null,
      });
      if (!transaction)
        //if no such transaction is found, throw an error
        throw new Error("Outstanding book reservation not found");

      //find the book in the database
      const book = await Book.findOne({ book_id });
      if (!book)
        //if the book is not found, throw an error
        throw new Error("Book not found");
      if (!book.on_loan)
        //if the book is not currently on loan, throw an error
        throw new Error("Book is not currently on loan");

      //check if the return date is before the borrow date
      const borrow_date = transaction.borrow_date;
      if (new Date(date) < new Date(borrow_date))
        throw new Error("Cannot return books retroactively");

      //update the transaction with the return date
      await Transaction.updateOne(
        { transaction_id: transaction.transaction_id },
        { return_date: new Date(date) }
      );
      //update the book's on_loan status to false
      await Book.updateOne({ book_id }, { on_loan: false });

      //respond with a success message
      res.status(200).json({ message: "Book returned successfully" });
    } catch (error) {
      //respond with an error message if something goes wrong
      res.status(400).json({ error: error.message });
    }
  } else {
    //respond with a 405 status code if the request method is not POST
    res.status(405).json({ error: "Method not allowed" });
  }
}
