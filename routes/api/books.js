const { Router } = require('express');

const booksController = require('../../controllers/api/books');

const router = Router();

/* GET books */
router.get('/', booksController.getBooks);

/* POST Add book */
router.post('/addBook', booksController.addBook);

/* GET book file */
router.get('/:id', booksController.getBookFile);

module.exports = router;
