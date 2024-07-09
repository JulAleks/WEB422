/*
 * WEB422 – Assignment 01
 * File: users.js
 * Name: Julia Alekseev Student ID: 051292134 Date: June 09, 2024
 */

//****************set required****************
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

//****************set user schema****************
const userSchema = new mongoose.Schema({
  user_id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

//****************init db****************
const initializeDatabase = () => {
  const dataPath = path.join(__dirname, "../Database/user.json");

  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, "utf-8", (err, data) => {
      if (err) {
        return reject(new Error("Error reading user data file"));
      }

      //gettign json
      const usersData = JSON.parse(data);

      //init DB
      User.countDocuments()
        .then((userCount) => {
          if (userCount === 0) {
            return User.insertMany(usersData).then(() => {
              console.log("BD init with user data.");
              resolve();
            });
          } else {
            console.log("DB with user already init");
            resolve();
          }
        })
        .catch((err) => {
          reject(new Error("Error init db: " + err.message));
        });
    });
  });
};

//****************get all users****************
const getAllUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error("Error retrieving users:", err);
      res.status(500).send("Internal Server Error");
    });
};

//****************export****************
module.exports = {
  getAllUsers,
  User,
  initializeDatabase,
};
