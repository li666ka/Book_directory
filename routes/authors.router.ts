import { Router } from 'express';

import AuthorsController from '../controllers/authors/authors.controller';

import { upload } from '../configs/multer.config';
import AuthMiddleware from '../middlewares/auth.middleware';
import RoleName from '../configs/roles.config';

const router: Router = Router();

router.get('/', AuthorsController.getAll);
router.get('/:id', AuthorsController.get);
router.post(
	'/',
	AuthMiddleware.require(false, RoleName.Admin, RoleName.Moderator),
	upload.fields([
		{ name: 'author-image', maxCount: 1 },
		{ name: 'book-image', maxCount: 1 },
		{ name: 'book-file', maxCount: 1 },
	]),
	AuthorsController.create
);
router.put(
	'/:id',
	AuthMiddleware.require(false, RoleName.Admin, RoleName.Moderator),
	upload.fields([{ name: 'author-image', maxCount: 1 }]),
	AuthorsController.update
);
router.delete(
	'/:id',
	AuthMiddleware.require(false, RoleName.Admin, RoleName.Moderator),
	AuthorsController.delete
);

export default router;
