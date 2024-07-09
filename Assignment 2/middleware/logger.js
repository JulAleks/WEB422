/*
 * WEB422 – Assignment 02
 * File: logger.js
 * Name: Julia Alekseev Student ID: 051292134 Date: July 08, 2024
 */

//logger middleware to log the HTTP and URL requests to monitor and debug
export default function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}
