/*
 * WEB422 – Assignment 02
 * File: About.js
 * Name: Julia Alekseev Student ID: 051292134 Date: July 08, 2024
 */
export default function About() {
  return (
    <div>
      <h1>About Page</h1>
      <br />
      <h2>
        WEB422 Assignment 2: Implementing a Simple Library Management System
        with Next.js
      </h2>
      <p>
        Welcome to Assignment 2 of WEB422! This project involves developing a
        simple Library Management System using Next.js. The system is designed
        to facilitate borrowing and returning books for users, while also
        providing admin functionality for managing the book inventory.
      </p>
      <br />
      <h3>Features</h3>
      <ol>
        <li>
          <b>User Functionality:</b>
        </li>
        <ul>
          <li>
            <b>Borrow Books:</b> Users can browse the library's collection and
            borrow available books.
          </li>
          <li>
            <b>Return Books:</b> Users can return books they have borrowed once
            they are done.
          </li>
        </ul>
        <br />
        <li>
          <b>Admin Functionality:</b>
        </li>
        <ul>
          <li>
            <b>Add New Books: </b> Admins, such as Julia or Navid, can add new
            books to the library's collection.
          </li>
          <li>
            <b>Edit Books:</b> Admins can edit details of existing books, such
            as the title, author, or availability status.
          </li>
          <li>
            <b>Delete Books:</b> Admins can remove books from the collection if
            they are no longer available or needed.
          </li>
        </ul>
      </ol>
      <br />
      <h3>Technology Stack</h3>
      <ul>
        <li>
          <b>Frontend and Backend:</b>Built with Next.js, a React framework that
          enables both client-side and server-side rendering.
        </li>
        <li>
          <b>Styling:</b> Utilizes Bootstrap for responsive and modern UI
          design.
        </li>
        <li>
          <b>Database:</b> Utilizes Bootstrap for responsive and modern UI
          design.
        </li>
        <li>
          <b>Database:</b> Utilizes MongoDB to store book and user data.
        </li>
        <li>
          <b>API Requests: </b>Uses Axios for handling HTTP requests to interact
          with the backend API.
        </li>
      </ul>
    </div>
  );
}
