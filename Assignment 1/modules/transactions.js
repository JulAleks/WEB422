/*
 * WEB422 – Assignment 01
 * File: books.js
 * Version: Assignment 1
 * Name: Julia Alekseev Student ID: 051292134 Date: June 09, 2024
 */

//****************set required****************
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { Book } = require("./books");
const { User } = require("./users");
const { log } = require("console");

//****************set transaction schema****************
const transactionSchema = new mongoose.Schema({
  transaction_id: { type: Number, required: true, unique: true },
  user_id: { type: Number, required: true },
  book_id: { type: Number, required: true },
  borrow_date: { type: Date, required: false },
  return_date: { type: Date, required: false },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

//****************init transaction DB****************
const initializeDatabase = () => {
  const dataPath = path.join(__dirname, "../Database/transactions.json");

  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, "utf-8", (err, data) => {
      if (err) return reject(new Error("Error reading transactions data file"));

      //getting data from json
      const transactionsData = JSON.parse(data);

      //inserting to db
      Transaction.countDocuments()
        .then((transactionCount) => {
          if (transactionCount === 0) {
            return Transaction.insertMany(transactionsData).then(() => {
              console.log("DB init with transactions");
              resolve();
            });
          } else {
            console.log("DB already has transactions");
            resolve();
          }
        })
        .catch((err) => {
          reject(new Error("Error init DB: " + err.message));
        });
    });
  });
};

//****************get all transactions****************
const getAllTransactions = (req, res) => {
  Transaction.find()
    .then((transactions) => {
      res.json(transactions);
    })
    .catch((err) => {
      console.error("Error retrieving transactions:", err);
      res.status(500).send("Internal Server Error");
    });
};

//****************reserve a books****************
const reserveABook = async (req, res) => {
  const { user_id, book_id, reserve_date } = req.body;

  try {
    //getting dates
    const reserveDate = new Date(reserve_date);
    reserveDate.setUTCHours(0, 0, 0, 0);

    //making sure today is utc
    const today = new Date();
    const todayUTC = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
    );

    //check if the reservation date is today or a future date
    if (reserveDate < todayUTC) {
      throw new Error("Cannot reserve retroactively");
    }

    //check if the user is valid
    const user = await User.findOne({ user_id: user_id }).exec();
    if (!user) {
      throw new Error("Invalid user");
    }

    //finding book
    const book = await Book.findOne({ book_id: book_id }).exec();
    if (!book) {
      throw new Error("Book not found");
    }
    if (book.on_loan) {
      throw new Error("Book is already on loan");
    }

    //finfing last transaction
    const lastTrans = await Transaction.findOne()
      .sort({ transaction_id: -1 })
      .exec();
    //new transaction ID
    const newTransId = lastTrans ? lastTrans.transaction_id + 1 : 1;

    //making new transaction
    const newTrans = new Transaction({
      transaction_id: newTransId,
      user_id: user_id,
      book_id: book_id,
      borrow_date: reserveDate,
    });

    //saving and updating
    await newTrans.save();
    await Book.updateOne({ book_id: book_id }, { on_loan: true }).exec();

    console.log("Book reserved successfully");
    res.redirect("/books");
  } catch (err) {
    console.error("Error reserving book:", err.message);

    try {
      //get books
      const books = await Book.find().exec();
      res.render("reserve", {
        errorMessage: err.message,
        books, //pass books to the template
      });
    } catch (fetchErr) {
      console.error("Error fetching books:", fetchErr.message);
      res.status(500).send("Internal Server Error");
    }
  }
};

//****************return a books****************
const returnABook = async (req, res) => {
  const { user_id, book_id, return_date } = req.body;

  try {
    //getting all books
    const books = await Book.find().exec();

    //getting the correct transaction
    const transaction = await Transaction.findOne({
      user_id: user_id,
      book_id: book_id,
      return_date: null,
    });

    //checking to see if the book is assigned to a specific user
    if (!transaction) {
      const book = await Book.findOne({ book_id: book_id });
      const user = await User.findOne({ user_id: user_id });

      const bookTitle = book ? book.title : "the book";
      const userName = user ? user.name : "Unknown User";

      return res.status(404).render("return", {
        errorMessage: `Outstanding book reservation for ${bookTitle} is not found for ${userName}`,
        books,
      });
    }

    //checking that the book is on loan
    const book = await Book.findOne({ book_id: book_id });

    if (!book) {
      throw new Error("Book not found");
    }

    if (!book.on_loan) {
      throw new Error("Book is not currently on loan");
    }

    //check that the return date is not retroactive
    const borrow_date = transaction.borrow_date;
    if (new Date(return_date) < new Date(borrow_date)) {
      throw new Error("Cannot return books retroactively");
    }

    //update the transaction
    await Transaction.updateOne(
      { transaction_id: transaction.transaction_id },
      { return_date: new Date(return_date) }
    );

    //update the book status to not on loan
    await Book.updateOne({ book_id: book_id }, { on_loan: false });

    console.log("Book returned successfully");
    res.redirect("/books");
  } catch (err) {
    console.error("Error returning book:", err);
    const books = await Book.find().exec();
    res.status(500).render("return", {
      errorMessage: err.message,
      books,
    });
  }
};

//****************export consts****************
module.exports = {
  getAllTransactions,
  Transaction,
  initializeDatabase,
  reserveABook,
  returnABook,
};
