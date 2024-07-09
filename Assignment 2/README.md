# Library Management System

This is a Library Management System project built with [Next.js](https://nextjs.org/). The system allows users to perform CRUD operations on books and manage borrow and return transactions. This project demonstrates full-stack development, API design, and CRUD operations using the Next.js framework.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

Install the dependencies:

\`\`\`bash
npm install

# or

yarn install

# or

pnpm install
\`\`\`

### Running the Development Server

First, run the development server:

\`\`\`bash
npm run dev

# or

yarn dev

# or

pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## API Endpoints

The \`pages/api\` directory contains the API routes for managing books and transactions. Here are the available endpoints:

### Books

- **GET /api/books**: Retrieve all books.
- **POST /api/books**: Add a new book.
- **GET /api/books/:id**: Retrieve a book by ID.
- **PUT /api/books/:id**: Update a book by ID.
- **DELETE /api/books/:id**: Delete a book by ID.

### Transactions

- **POST /api/borrow**: Borrow a book.
- **POST /api/return**: Return a book.

## Frontend Design

The frontend of the application is built using Next.js, HTML, CSS, and Bootstrap. The main features include:

### Admin Page

- **List All Books**: Displays all books with options to add, edit, or delete books.
- **Add New Book**: A form to add new books to the library.
- **Edit Book**: A form to edit book details.
- **Delete Book**: A button to delete books with a confirmation prompt.

### Borrow Interface

- **Borrow a Book**: Allows users to borrow books by selecting a book and providing a date.
- **Return a Book**: Allows users to return borrowed books.

## Project Setup Instructions

1. **Project Initialization**:

   - The project was initialized with \`create-next-app\`.

2. **Database Connection**:

   - MongoDB is used as the database for storing book and transaction data.
   - Mongoose is used to define models and interact with the database.

3. **API Design**:
   - Next.js API routes are used to build the backend APIs for managing books and transactions.
   - Error handling is implemented within the API routes to manage errors gracefully.
