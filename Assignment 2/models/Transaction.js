/*
 * WEB422 – Assignment 02
 * File: Transaction.js
 * Name: Julia Alekseev Student ID: 051292134 Date: July 08, 2024
 */
//transaction schema
import mongoose from "mongoose"; //import mongoose for MongoDB operations

//define the transaction schema with various fields and their constraints
const transactionSchema = new mongoose.Schema({
  transaction_id: { type: Number, required: true, unique: true }, //unique transaction ID
  user_id: { type: Number, required: true }, //ID of the user involved in the transaction
  book_id: { type: Number, required: true }, //ID of the book involved in the transaction
  borrow_date: { type: Date, required: false }, //date when the book was borrowed
  return_date: { type: Date, required: false }, //date when the book was returned
});

//create the Transaction model if it doesn't already exist, otherwise use the existing model
const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);

export default Transaction; //export the Transaction model
