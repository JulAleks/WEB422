/*
 * WEB422 – Assignment 01
 * File: books.js
 *Version: Assignment 1
 * Name: Julia Alekseev Student ID: 051292134 Date: June 09, 2024
 */

//****************set required****************
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

//****************set book schema****************
const bookSchema = new mongoose.Schema({
  book_id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  ISBN: { type: String, required: true },
  brief_explanation: { type: String, required: true },
  photo_link: { type: String, required: true },
  on_loan: { type: Boolean, required: true, default: false },
});

const Book = mongoose.model("Book", bookSchema);

//****************init book DB****************
const initializeDatabase = () => {
  const dataPath = path.join(__dirname, "../Database/books.json");

  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, "utf-8", (err, data) => {
      if (err) return reject(err);

      //getting json
      const booksData = JSON.parse(data);

      //init db
      Book.countDocuments()
        .exec()
        .then((bookCount) => {
          if (bookCount === 0) {
            return Book.insertMany(booksData);
          } else {
            console.log("DB already has books.");
            resolve();
          }
        })
        .then(() => {
          console.log("DB init with books.");
          resolve();
        })
        .catch((err) => {
          console.error("Error init DB:", err.message);
          reject(err);
        });
    });
  });
};

//****************get all books****************
const getAllBooks = (req, res) => {
  Book.find()
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      console.error("Error fetching books:", err);
      res.status(500).send("Server Error");
    });
};

//****************get book by id****************
const getBookById = (bookNum) => {
  return Book.find()({
    where: { book_id: bookNum },
  })
    .then((bookFromDB) => {
      return Promise.resolve(bookFromDB);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

//****************add new book****************
const addNewBook = (req, res) => {
  const { title, author, ISBN, brief_explanation, photo_link } = req.body;

  Book.findOne()
    //finding last book id
    .sort({ book_id: -1 })
    .exec()
    .then((lastBook) => {
      //getting new id
      const newBookId = lastBook ? lastBook.book_id + 1 : 1;

      //making new book
      const newBook = new Book({
        book_id: newBookId,
        title,
        author,
        ISBN,
        brief_explanation,
        photo_link,
      });

      return newBook.save();
    })
    .then(() => {
      res.redirect("/books");
    })
    .catch((err) => {
      console.error("Error adding book:", err);
      res.status(500).send("Server Error");
    });
};

//****************edit book (for ON LOAN)****************
const editBook = (id, on_loan) => {
  return Book.updateOne({ book_id: id }, { on_loan })
    .then((result) => {
      if (result.nModified === 0) {
        return Promise.reject(new Error("Book not found"));
      }
      return Promise.resolve({ message: "Book updated successfully" });
    })
    .catch((err) => {
      return Promise.reject(err.message);
    });
};

//****************delete****************
const deleteBook = (id) => {
  return Book.deleteOne({ book_id: id })
    .then((result) => {
      if (result.deletedCount === 0) {
        return Promise.reject(new Error("Book not found"));
      }
      return Promise.resolve({ message: "Book deleted successfully" });
    })
    .catch((err) => {
      return Promise.reject(err.message);
    });
};

//****************export consts****************
module.exports = {
  getAllBooks,
  Book,
  initializeDatabase,
  getBookById,
  addNewBook,
  editBook,
  deleteBook,
};
