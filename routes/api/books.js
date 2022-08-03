const { Router } = require('express');

const BooksController = require('../../controllers/api/books');

const router = Router();

/* GET books */
router.get('/', BooksController.getBooks);

/* POST Add book */
router.post('/addBook', BooksController.addBook);

/* GET book file */
router.get('/:id', BooksController.getBookFile);

module.exports = router;
