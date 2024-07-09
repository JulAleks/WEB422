/*
 * WEB422 – Assignment 01
 * File: app.ejs
 * Name: Julia Alekseev Student ID: 051292134 Date: June 09, 2024
 */

//****************set required****************
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

//****************set init****************
const {
  getAllBooks,
  getBookById,
  addNewBook,
  editBook,
  deleteBook,
  Book,
  initializeDatabase: initializeBookDatabase,
} = require("./modules/books");

const {
  initializeDatabase: initializeUserDatabase,
} = require("./modules/users");

const {
  initializeDatabase: initializeTransactionDatabase,
  reserveABook,
  returnABook,
} = require("./modules/transactions");

const app = express();

//****************set up EJS****************
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//****************set middlewares****************
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use("/vendor", express.static(path.join(__dirname, "vendor")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

//****************connect to DB****************
const connectDB = () => {
  return mongoose.connect(process.env.DB, {});
};

//****************init the DB****************
connectDB()
  .then(async () => {
    await initializeBookDatabase();
    await initializeUserDatabase();
    await initializeTransactionDatabase();

    //APIs
    //CRUD for books
    app.get("/api/books", getAllBooks);
    app.post("/api/books", addNewBook);
    app.get("/api/books/:id", getBookById);
    app.put("/api/books/:id", editBook);
    app.delete("/api/books/:id", deleteBook);

    //Borrow & return
    app.post("/api/transactions/reserve", reserveABook);
    app.post("/api/transactions/return", returnABook);

    //****************index****************
    app.get("/", (req, res) => {
      res.render("index");
    });

    //****************about****************
    app.get("/about", (req, res) => {
      res.render("about");
    });

    //****************books****************
    app.get("/books", (req, res) => {
      Book.find()
        .then((books) => {
          res.render("books", { books });
        })
        .catch((err) => {
          console.error("Error fetching books:", err);
          res.status(500).send("Error fetching books");
        });
    });

    //****************book by ID****************
    app.get("/book/:id", (req, res) => {
      Book.findById(req.params.id)
        .then((book) => {
          if (!book) {
            return res.status(404).render("404", { message: "Book not found" });
          }
          res.render("book", { book });
        })
        .catch((err) => {
          console.error("Error fetching book:", err);
          res.status(500).send("Error fetching book");
        });
    });

    //****************add new book****************
    app.get("/addBook", (req, res) => {
      res.render("addBook");
    });

    //****************return a book****************
    app.get("/return", (req, res) => {
      Book.find()
        .then((books) => {
          res.render("return", { books });
          console.log("Return page opened successfully");
        })
        .catch((err) => {
          console.error("Error fetching books:", err);
          res.status(500).send("Internal Server Error");
        });
    });

    //****************reserve a book****************
    app.get("/reserve", (req, res) => {
      Book.find()
        .then((books) => {
          res.render("reserve", { books });
          console.log("Reserve page opened successfully");
        })
        .catch((err) => {
          console.error("Error fetching books for reserve page:", err);
          res
            .status(500)
            .send("Internal Server Error: Unable to load reserve page");
        });
    });

    //****************delete a book ****************
    app.post("/api/books/delete/:id", (req, res) => {
      const { id } = req.params;
      deleteBook(id)
        .then(() => {
          res.redirect("/books");
        })
        .catch((err) => {
          console.error("Error deleting book:", err);
          res.status(500).send("Server Error");
        });
    });

    //****************start server****************
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

//****************app error****************
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
