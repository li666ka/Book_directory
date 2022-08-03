const { Router } = require('express');

const AuthorsController = require('../../controllers/api/authors');

const router = Router();

/* Add author */
router.post('/addAuthor', AuthorsController.addAuthor);

/* GET authors names */
router.get('/names', AuthorsController.getAuthorNames);

/* GET author info */
router.get('/:id', AuthorsController.getAuthorInfo);

module.exports = router;
