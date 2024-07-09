/*
 * WEB422 – Assignment 02
 * File: [id].js
 * Name: Julia Alekseev Student ID: 051292134 Date: July 08, 2024
 */
import { useRouter } from "next/router"; //import useRouter to access route parameters
import dbConnect from "../lib/dbConnect"; //import the connection to the database
import Book from "../models/Book"; //import the Book model

//component to display a specific book's details
const BookDetail = ({ book }) => {
  const router = useRouter(); //use the router hook to get the route parameters

  //if the book data is not yet loaded, show a loading message
  if (router.isFallback || !book) {
    return <div>Loading...</div>;
  }

  //function to handle loan/return button click
  const handleLoanReturn = (action) => {
    //redirect to loan-return page with book_id and action as query parameters
    router.push(`/loan-return?book_id=${book.book_id}&action=${action}`);
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              src={book.photo_link}
              className="card-img"
              alt={book.title}
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h1 className="card-title">{book.title}</h1>
              <p className="card-text">
                <strong>Author:</strong> {book.author}
              </p>
              <p className="card-text">
                <strong>ISBN:</strong> {book.ISBN}
              </p>
              <p className="card-text">{book.brief_explanation}</p>
              <button
                className={`btn ${book.on_loan ? "btn-danger" : "btn-success"}`}
                onClick={() =>
                  handleLoanReturn(book.on_loan ? "return" : "loan")
                }
              >
                {book.on_loan ? "Return Now" : "Borrow Now"}
              </button>
              <br />
              <button
                className="btn btn-primary mt-3"
                onClick={() => router.push("/books")}
              >
                Back to Books
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//fetch data for a specific book based on the id parameter
export async function getServerSideProps({ params }) {
  await dbConnect(); //connect to the database

  try {
    const book = await Book.findOne({ book_id: params.id }).lean(); //fetch the book by book_id
    return {
      props: {
        book: book ? JSON.parse(JSON.stringify(book)) : null, //pass the book as props
      },
    };
  } catch (error) {
    console.error("Error fetching book:", error); //handle errors
    return {
      props: {
        book: null, //return null if there's an error
      },
    };
  }
}

export default BookDetail; //export the BookDetail component
