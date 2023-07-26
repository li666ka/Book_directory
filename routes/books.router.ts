import { Router } from 'express';

import BooksController from '../controllers/books/books.controller';

import { upload } from '../configs/multer.config';
import { authorize } from '../middlewares/authorization';
import { validate } from '../middlewares/validation';

const router: Router = Router();

router.get('/', validate('books-get-all'), BooksController.getAll);
router.get('/:id', validate('books-get'), BooksController.get);
router.post(
	'/',
	authorize(false, 'admin', 'moderator'),
	validate('books-create'),
	upload.fields([
		{ name: 'book-image', maxCount: 1 },
		{ name: 'book-file', maxCount: 1 },
	]),
	BooksController.create
);
router.put(
	'/:id',
	authorize(false, 'admin', 'moderator'),
	validate('books-update'),
	upload.fields([
		{ name: 'book-image', maxCount: 1 },
		{ name: 'book-file', maxCount: 1 },
	]),
	BooksController.update
);
router.delete(
	'/:id',
	authorize(false, 'admin', 'moderator'),
	validate('books-update'),
	BooksController.delete
);

export default router;
