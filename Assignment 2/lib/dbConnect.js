/*
 * WEB422 – Assignment 02
 * File: dbConnect.js
 * Name: Julia Alekseev Student ID: 051292134 Date: July 08, 2024
 */

import mongoose from "mongoose"; // Import mongoose for MongoDB connection

// Connection string
const DB =
  "mongodb+srv://*****USER+PASSWORD*****.em9nwqz.mongodb.net/webLibrary?retryWrites=true&w=majority&appName=Julz";

// Caching to avoid reconnecting
let cached = global.mongoose;

// If db is not cached yet, initialize cache
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// Connection function
async function dbConnect() {
  // If a cached connection exists, return it
  if (cached.conn) {
    console.log("Using cached database instance");
    return cached.conn;
  }

  // If no connection promise exists, create one
  if (!cached.promise) {
    console.log("Connecting to MongoDB...");
    const opts = {
      bufferCommands: false,
    };

    // Create a new connection promise
    cached.promise = mongoose.connect(DB, opts).then((mongoose) => {
      console.log("Connected to MongoDB");
      return mongoose;
    });
  }

  // Wait for the promise to resolve and cache the connection
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect; // Export the dbConnect function
