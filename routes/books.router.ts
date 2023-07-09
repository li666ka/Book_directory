import { Router } from 'express';

import BooksController from '../controllers/books/books.controller';
import AuthService from '../services/auth.service';

import { upload } from '../configs/multer.config';

const router: Router = Router();

router.get('/', BooksController.getAll);
router.get('/:id', BooksController.get);
router.post(
	'/',
	// AuthService.verify,
	// AuthService.requireAdminOrModerator,
	upload.fields([
		{ name: 'book-image', maxCount: 1 },
		{ name: 'book-file', maxCount: 1 },
	]),
	BooksController.create
);
// router.put(
// 	'/:id',
// 	AuthService.verify,
// 	AuthService.requireAdminOrModerator,
// 	BooksController.update
// );
// router.delete(
// 	'/:id',
// 	AuthService.verify,
// 	AuthService.requireAdminOrModerator,
// 	BooksController.delete
// );

export default router;
