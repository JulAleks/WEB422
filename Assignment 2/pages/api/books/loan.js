/*
 * WEB422 – Assignment 02
 * File: loan.js
 * Name: Julia Alekseev Student ID: 051292134 Date: July 08, 2024
 */
import dbConnect from "../../../lib/dbConnect"; //import the database connection function
import Book from "../../../models/Book"; //import the Book model
import User from "../../../models/User"; //import the User model
import Transaction from "../../../models/Transaction"; //import the Transaction model

export default async function handler(req, res) {
  try {
    await dbConnect(); //connect to the database
    console.log("Database connection established");

    if (req.method === "POST") {
      const { user_id, book_id, date } = req.body; //extract the user_id, book_id, and date from the request body

      console.log("Received request body:", req.body);

      if (!user_id || !book_id || !date) {
        console.warn("Missing required fields:", { user_id, book_id, date });
        return res.status(400).json({ error: "Missing required fields" });
      }

      const numericUserId = Number(user_id); //convert user_id to a number
      if (isNaN(numericUserId)) {
        console.error("Invalid user_id, must be a number");
        return res
          .status(400)
          .json({ error: "Invalid user_id, must be a number" });
      }

      const reserveDate = new Date(date); //parse the reservation date
      reserveDate.setUTCHours(0, 0, 0, 0); //set the time to the start of the day
      const todayUTC = new Date(
        Date.UTC(
          new Date().getUTCFullYear(),
          new Date().getUTCMonth(),
          new Date().getUTCDate()
        )
      ); //get today's date in UTC

      if (reserveDate < todayUTC) {
        console.warn("Attempt to reserve retroactively:", reserveDate);
        return res.status(400).json({ error: "Cannot reserve retroactively" });
      }

      const user = await User.findOne({ user_id: numericUserId }).exec(); //find the user by user_id
      if (!user) {
        console.warn("Invalid user ID:", numericUserId);
        return res.status(400).json({ error: "Invalid user" });
      }

      const book = await Book.findOne({ book_id }).exec(); //find the book by book_id
      if (!book) {
        console.warn("Book not found:", book_id);
        return res.status(404).json({ error: "Book not found" });
      }
      if (book.on_loan) {
        console.warn("Book already on loan:", book_id);
        return res.status(400).json({ error: "Book is already on loan" });
      }

      const lastTrans = await Transaction.findOne()
        .sort({ transaction_id: -1 })
        .exec(); //find the last transaction
      const newTransId = lastTrans ? lastTrans.transaction_id + 1 : 1; //generate a new transaction ID

      const newTrans = new Transaction({
        transaction_id: newTransId,
        user_id: numericUserId,
        book_id,
        borrow_date: reserveDate,
      }); //create a new transaction

      await newTrans.save(); //save the new transaction
      await Book.updateOne({ book_id }, { on_loan: true }).exec(); //update the book's on_loan status

      console.log("Book reserved successfully:", {
        user_id: numericUserId,
        book_id,
        reserveDate,
      });
      return res.status(200).json({ message: "Book reserved successfully" });
    } else {
      return res.status(405).json({ error: "Method not allowed" }); //respond with a 405 status code if the request method is not POST
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ error: "Internal server error" }); //respond with a 500 status code if there is a server error
  }
}
