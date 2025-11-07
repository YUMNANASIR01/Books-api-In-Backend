const express = require('express');
const { getAllbooks, getBooksById ,createBook , deleteBookById,updateBookById , getBooksByTitle} = require('../controllers/books-controller');
const router = express.Router();
const {getBookValidateMiddleware, createBookValidateMiddleware, updateBookValidateMiddleware, deleteBookValidateMiddleware} = require ("../middleware/book.validation.middleware")

// ---get all books with this api-----
// GET http://localhost:8000/api/v1/books/
// GET http://localhost:8000/api/v1/books?search=someTitle
// GET http://localhost:8000/api/v1/books?bookId=1
// GET http://localhost:8000/api/v1/books?authorId=1
router.get('/', getBookValidateMiddleware, getAllbooks )

// ------------------------ create new book -----------------
// GET http://localhost:8000/api/v1/books
router.post('/',createBookValidateMiddleware ,createBook)

// ----------------------- delete book by id ------------------
// books by id delete
// DELETE http://localhost:8000/api/v1/books/:id
router.delete('/:id',deleteBookValidateMiddleware, deleteBookById)

// ---------------------- update book by id --------------------
// PATCH http://localhost:8000/api/v1/books/:id
router.patch('/:id', updateBookValidateMiddleware, updateBookById )


module.exports = router;

