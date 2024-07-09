/*
 * WEB422 – Assignment 02
 * File: layout.js
 * Name: Julia Alekseev Student ID: 051292134 Date: July 08, 2024
 */

import Image from "next/image"; // import next/image for optimized images
import Logo from "../public/logo.png"; // import logo image

export default function Layout(props) {
  const handleAdminClick = (e) => {
    e.preventDefault(); // prevent the default link behavior
    const userName = prompt("Please enter your name:");

    if (
      userName === "Julia" ||
      userName === "Navid" ||
      userName === "julia" ||
      userName === "navid"
    ) {
      window.location.href = "/admin"; // redirect to admin page if the name is correct
    } else {
      alert("Sorry, restricted area"); // show an alert if the name is incorrect
    }
  };

  return (
    <div className="gradient-gray-background">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <Image src={Logo} alt="Classic Vault Library Logo" width={200} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/books">
                Books
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/loan-return">
                Return/Loan Book
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/admin" onClick={handleAdminClick}>
                Admin
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container">
        <header className="my-4 text-center">
          <h1>Classic Vault Library</h1>
          <hr />
        </header>
        <main>{props.children}</main>
        <footer className="my-4">
          <p>
            &copy; 2024 Classic Vault Library. WEB422 Assignment 2. Julia
            Alekseev
          </p>
        </footer>
      </div>
    </div>
  );
}
