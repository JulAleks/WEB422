# Classic Library Vault

## Project Setup Instructions

### Node.js Installation

1. **Download and Install Node.js:**

   - Visit the [Node.js Downloads](https://nodejs.org/en/download/package-manager) page to download and install Node.js for your operating system.

2. **Verify Installation:**
   - Open your terminal or command shell.
   - Run the following commands to ensure Node.js is installed successfully:
     ```bash
     node -v
     npm -v
     ```

### Project Setup in Any Environment

1. **Open Project in IDE:**

   - Open the project folder in VS Code or your preferred IDE.

2. **Install npm Packages:**

   - Open the terminal or command shell.
   - Ensure you are in the project's root folder.
   - Run the following command to install npm packages:
     ```bash
     npm install
     ```

3. **Run the Application:**

   - In the root folder of the project, run the app using the following command:
     ```bash
     node app.js
     ```

4. **Access the Application:**
   - After running the app, you should see a message in the terminal indicating that the project is ready on port 8080.
   - Open your browser and go to: [http://localhost:8080](http://localhost:8080)
   - You should gain access to the library app.

## API Endpoints and Their Usage

### CRUD Operations for Books

1. **Retrieve all books**

   - **Endpoint:** `GET /api/books`
   - **Description:** Fetches a list of all books in the library.
   - **Response:**
     ```json
     [
       {
         "book_id": 1,
         "title": "Book Title",
         "author": "Author Name",
         "ISBN": "123-4567890123",
         "brief_explanation": "Brief description of the book",
         "photo_link": "http://example.com/photo.jpg",
         "on_loan": false
       },
       ...
     ]
     ```

2. **Add a new book**

   - **Endpoint:** `POST /api/books`
   - **Description:** Adds a new book to the library.
   - **Request Body:**
     ```json
     {
       "title": "New Book Title",
       "author": "Author Name",
       "ISBN": "123-4567890123",
       "brief_explanation": "Brief description of the book",
       "photo_link": "http://example.com/photo.jpg"
     }
     ```
   - **Response:**
     ```json
     {
       "book_id": new_book_id,
       "title": "New Book Title",
       "author": "Author Name",
       "ISBN": "123-4567890123",
       "brief_explanation": "Brief description of the book",
       "photo_link": "http://example.com/photo.jpg",
       "on_loan": false
     }
     ```

3. **Retrieve a book by ID**

   - **Endpoint:** `GET /api/books/:id`
   - **Description:** Fetches details of a specific book by its ID.
   - **Response:**
     ```json
     {
       "book_id": 1,
       "title": "Book Title",
       "author": "Author Name",
       "ISBN": "123-4567890123",
       "brief_explanation": "Brief description of the book",
       "photo_link": "http://example.com/photo.jpg",
       "on_loan": false
     }
     ```

4. **Update a book by ID**

   - **Endpoint:** `PUT /api/books/:id`
   - **Description:** Updates details of a specific book by its ID.
   - **Request Body:**
     ```json
     {
       "title": "Updated Book Title",
       "author": "Updated Author Name",
       "ISBN": "123-4567890123",
       "brief_explanation": "Updated brief description of the book",
       "photo_link": "http://example.com/photo.jpg"
     }
     ```
   - **Response:**
     ```json
     {
       "book_id": 1,
       "title": "Updated Book Title",
       "author": "Updated Author Name",
       "ISBN": "123-4567890123",
       "brief_explanation": "Updated brief description of the book",
       "photo_link": "http://example.com/photo.jpg",
       "on_loan": false
     }
     ```

5. **Delete a book by ID**
   - **Endpoint:** `DELETE /api/books/:id`
   - **Description:** Deletes a specific book by its ID.
   - **Response:**
     ```json
     {
       "message": "Book deleted successfully"
     }
     ```

### Borrowing and Returning Books

1. **Reserve a book**

   - **Endpoint:** `POST /api/transactions/reserve`
   - **Description:** Reserves a book for a user.
   - **Request Body:**
     ```json
     {
       "user_id": 1010,
       "book_id": 1,
       "reserve_date": "2024-06-10"
     }
     ```
   - **Response:**
     ```json
     {
       "transaction_id": 1,
       "user_id": 1010,
       "book_id": 1,
       "borrow_date": "2024-06-10",
       "message": "Book reserved successfully"
     }
     ```

2. **Return a book**
   - **Endpoint:** `POST /api/transactions/return`
   - **Description:** Returns a book that was borrowed by a user.
   - **Request Body:**
     ```json
     {
       "user_id": 1010,
       "book_id": 1,
       "return_date": "2024-06-15"
     }
     ```
   - **Response:**
     ```json
     {
       "transaction_id": 1,
       "user_id": 1010,
       "book_id": 1,
       "borrow_date": "2024-06-10",
       "return_date": "2024-06-15",
       "message": "Book returned successfully"
     }
     ```

## About Assignment 1

This assignment represents a basic library system for the WEB422 course. It includes the required book CRUD operations and the endpoints for borrowing and returning books. The assignment uses Express, Mongoose, body-parser, and CORS.

### Known Limitations

- No user authentication (to be developed in subsequent assignments).
- Books can be deleted by anyone due to the lack of authentication.
- Errors are thrown as responses, console logs, and presented in the UI (e.g., wrong user trying to return or reserve a book, reserving books retroactively, returning a book past the due date).

### Current Users in the Database

| User ID | Name  |
| ------- | ----- |
| 1010    | Julia |
| 2020    | Navid |
| 3030    | John  |

## Frontend Design

For the user interface, I used Bootstrap's SnapX theme. Some CSS was modified to improve the UI for the assignment. I chose the SnapX theme because it resembled a gallery of photos, which I thought could represent a book gallery effectively. The original color scheme was retained because blue is a non-threatening color associated with trust, relaxation, and tranquility.

The name of the library system is **Classic Library Vault**, chosen to evoke a sense of timelessness and security. The logo was designed by me to provide a personal touch.

## Author

- **Julia Alekseev** - _Developer and Designer_
