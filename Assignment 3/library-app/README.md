# Library Management System

## Description

This project is a Library Management System developed with Angular for the frontend and Node.js with Express for the backend. The application allows users to manage a library's book collection, including adding, updating, deleting, and borrowing books.

## Prerequisites

- Node.js and npm installed on your machine.
- Angular CLI installed (`npm install -g @angular/cli`).

## Project Structure

- `/client` - Contains the Angular client application.
- `/server` - Contains the Express server application.
- `/client/node_modules` and `/server/node_modules` - Contains all node dependencies.
- `/server/models` - Contains server models.
- `/server/routes` - Contains API routes.
- `/client/src` - Contains source files for Angular application.

## Setup Instructions

- Clone the repository or extract the zip file.
- Ensure you have Node.js, npm, and Angular CLI installed.

### Install Dependencies

Navigate to each part of the project and install dependencies:

```sh
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
npm install -g @angular/cli
```

## Running the Project

### Run the Server

From the project root folder:

```sh
cd server
node app.js
```

### Run the Client

Open a new terminal:

```sh
cd client
ng serve
```

### Access the Application

Open a web browser and navigate to:

```
http://localhost:4200/
```

This URL will take you to the home page of the Angular application.

## API Endpoints

Provide details on the API endpoints exposed by your server. Include methods (GET, POST, DELETE, etc.), endpoint paths, required parameters, and a brief description of what each endpoint does.

## API Endpoints

### Books

- **GET `/api/books`**  
  Retrieves all books from the library.
- **GET `/api/books/:id`**  
  Retrieves a single book by its ID.

- **POST `/api/books`**  
  Adds a new book to the library. Requires book details in the request body.

- **PUT `/api/books/:id`**  
  Updates an existing book by its ID. Requires one or more book fields to update.

- **DELETE `/api/books/:id`**  
  Deletes a book from the library by its ID.

- **GET `/api/books/details/:id`**  
  Retrieves detailed information of a book including its transactions.

### Transactions

- **POST `/api/transactions/borrow/:id`**  
  Creates a transaction to borrow a book. Requires `user_id` and `borrow_date`.

- **GET `/api/transactions/borrow/:id`**  
  Retrieves an active borrow transaction for a specific book by its ID.

- **POST `/api/transactions/return/:id`**  
  Completes a transaction to return a book. Requires `user_id` and `return_date`.

### Users

- **GET `/api/users`**  
  Retrieves all users.

- **GET `/api/users/:id`**  
  Retrieves a single user by their ID.

## Admin Access

To enter the admin page and manage (add, edit, or delete) books, please navigate to the manage-books button in the top bar. Use the access code "admin" when prompted to gain administrative privileges.

## Frontend Design

The frontend of the Library Management System uses Angular components and Bootstrap for consistent and responsive layout and design, similar to approaches used in previous projects. Additionally, personal design preferences were incorporated, leading to adjustments in the CSS to better reflect a unique visual style. This hybrid approach combines functionality with a personalized aesthetic that enhances user interaction and experience.

## License

This project is a part of coursework for WEB422 - Web Programming for Apps and Services at Seneca College, Professor Navid Mohaghegh. 202-08-10.
