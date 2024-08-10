/*
 * WEB422 – Assignment 03
 * Name: Julia Alekseev Student ID: 051292134 Date: Aug 10, 2024
 */

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bookRoutes = require("./routes/books");
const userRoutes = require("./routes/users");
const transactionRoutes = require("./routes/transactions");
const dbConnect = require("./db");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
dbConnect()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
