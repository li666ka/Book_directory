import { Router } from 'express';

import BooksController from '../controllers/books/books.controller';

import { upload } from '../configs/multer.config';
import AuthMiddleware from '../middlewares/auth.middleware';
import RoleName from '../configs/roles.config';

const router: Router = Router();

router.get('/', BooksController.getAll);
router.get('/:id', BooksController.get);
router.post(
	'/',
	AuthMiddleware.require(false, RoleName.Admin, RoleName.Moderator),
	upload.fields([
		{ name: 'book-image', maxCount: 1 },
		{ name: 'book-file', maxCount: 1 },
	]),
	BooksController.create
);
router.put(
	'/:id',
	AuthMiddleware.require(false, RoleName.Admin, RoleName.Moderator),
	upload.fields([
		{ name: 'book-image', maxCount: 1 },
		{ name: 'book-file', maxCount: 1 },
	]),
	BooksController.update
);
router.delete(
	'/:id',
	AuthMiddleware.require(false, RoleName.Admin, RoleName.Moderator),
	BooksController.delete
);

export default router;
