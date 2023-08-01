import { Router } from 'express';

import BooksController from '../controllers/books/books.controller';

import { BOOK_FILE_FIELD, BOOK_IMAGE_FIELD, upload } from '../utils/multer.util';
import { authorize } from '../middlewares/authorization';
import { validate } from '../middlewares/validation';

const router: Router = Router();

router.get('/', validate('books-get-all'), BooksController.getAll);
router.get('/:id', BooksController.get);
router.post(
	'/',
	authorize(false, 'admin', 'moderator'),
	validate('books-create'),
	BooksController.create
);
router.post(
	'/:id/image',
	authorize(false, 'admin', 'moderator'),
	upload.single(BOOK_IMAGE_FIELD),
	validate('books-upload-image'),
	BooksController.uploadImage
);
router.post(
	'/:id/file',
	authorize(false, 'admin', 'moderator'),
	upload.single(BOOK_FILE_FIELD),
	validate('books-upload-file'),
	BooksController.uploadFile
);
router.put(
	'/:id',
	authorize(false, 'admin', 'moderator'),
	validate('books-update'),
	BooksController.update
);
router.delete('/:id', authorize(false, 'admin', 'moderator'), BooksController.delete);

export default router;
