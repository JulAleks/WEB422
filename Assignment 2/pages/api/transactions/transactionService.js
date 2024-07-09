/*
 * WEB422 – Assignment 02
 * File: transactionService.js
 * Name: Julia Alekseev Student ID: 051292134 Date: July 08, 2024
 */
//get all transactions
import Transaction from "../../../models/Transaction"; //import the Transaction model

//function to get all transactions
export const getAllTransactions = async () => {
  try {
    //fetch all transactions from the DB
    const transactions = await Transaction.find({});
    return transactions; //return the fetched transactions
  } catch (error) {
    console.error("Error fetching transactions:", error); //log any errors that occur
    throw new Error("Error fetching transactions"); //throw an error if fetching fails
  }
};

//function to get a transaction by ID
export const getTransactionById = async (transactionId) => {
  try {
    const transaction = await Transaction.findOne({
      transaction_id: transactionId,
    }); //find transaction by transaction_id
    return transaction; //return the fetched transaction
  } catch (err) {
    console.error("Error fetching transaction by ID:", err); //log any errors that occur
    throw new Error("Error fetching transaction by ID"); //throw an error if fetching fails
  }
};
