const express = require('express');

const { getAllAuthors, createAuthor, updateAuthorById ,deleteAuthorById} = require('../controllers/authors-contollers');
const {getAuthorValidateMiddleware, createAuthorValidateMiddleware, updateAuthorValidateMiddleware, deleteAuthorValidateMiddleware} = require ("../middleware/author.validation.middleware")


const router = express.Router();

// ----------- author api--------------------------
// Get all authors
// GET /api/v1/authors/
// GET api/v1/author?search=xyz
router.get("/", getAuthorValidateMiddleware,getAllAuthors) 

// Create a new author
// POST /api/v1/authors/
router.post("/", createAuthorValidateMiddleware,createAuthor)


// // update an author
// // PATCH /api/v1/authors/:id
router.patch("/:id", updateAuthorValidateMiddleware, updateAuthorById)


// // delete an author
// // Delete /api/v1/authors/:id
router.delete("/:id",deleteAuthorValidateMiddleware, deleteAuthorById)

module.exports = router;

