/*
 * WEB422 – Assignment 02
 * File: add-book.js
 * Name: Julia Alekseev Student ID: 051292134 Date: July 08, 2024
 */
import { useState } from "react"; // Importing useState hook from React
import axios from "axios"; // Importing axios for making HTTP requests

export default function AddNewBook() {
  const [title, setTitle] = useState(""); // Initializing state for title
  const [author, setAuthor] = useState(""); // Initializing state for author
  const [isbn, setIsbn] = useState(""); // Initializing state for ISBN
  const [briefExplanation, setBriefExplanation] = useState(""); // Initializing state for brief explanation
  const [photoLink, setPhotoLink] = useState(""); // Initializing state for photo link
  const [message, setMessage] = useState(""); // Initializing state for message

  const handleSubmit = async (e) => {
    // Defining handleSubmit function to handle form submission
    e.preventDefault(); // Preventing default form submission behavior
    try {
      await axios.post("/api/books/add-new", {
        // Making a POST request to add a new book
        title, // Sending title
        author, // Sending author
        ISBN: isbn, // Sending ISBN
        brief_explanation: briefExplanation, // Sending brief explanation
        photo_link: photoLink, // Sending photo link
      });
      setMessage("Book added successfully!"); // Setting success message
      setTitle(""); // Resetting title input
      setAuthor(""); // Resetting author input
      setIsbn(""); // Resetting ISBN input
      setBriefExplanation(""); // Resetting brief explanation input
      setPhotoLink(""); // Resetting photo link input
    } catch (error) {
      console.error("Error adding book:", error); // Logging any errors that occur during book addition
      setMessage("Error adding book."); // Setting error message
    }
  };

  return (
    <div className="container">
      <h1>Add New Book</h1>
      <form onSubmit={handleSubmit}>
        {/* Form to handle adding a new book */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="isbn">ISBN</label>
          <input
            type="text"
            id="isbn"
            className="form-control"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="briefExplanation">Brief Explanation</label>
          <textarea
            id="briefExplanation"
            className="form-control"
            value={briefExplanation}
            onChange={(e) => setBriefExplanation(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="photoLink">Photo Link</label>
          <input
            type="text"
            id="photoLink"
            className="form-control"
            value={photoLink}
            onChange={(e) => setPhotoLink(e.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Add Book
        </button>
      </form>
      {message && <p>{message}</p>} {/* Displaying success or error message */}
    </div>
  );
}
