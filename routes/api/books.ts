import { Router } from 'express';

import booksController from '../../controllers/api/books';

const router: Router = Router();

/* GET books */
router.get('/', booksController.getBooks);

/* POST Add book */
router.post('/addBook', booksController.addBook);

/* GET book file */
router.get('/:id', booksController.getBookFile);

export default router;
