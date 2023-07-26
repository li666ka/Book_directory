import { Router } from 'express';

import AuthorsController from '../controllers/authors/authors.controller';
import { upload } from '../configs/multer.config';
import { authorize } from '../middlewares/authorization';
import { validate } from '../middlewares/validation';

const router: Router = Router();

router.get('/', validate('authors-get-all'), AuthorsController.getAll);
router.get('/:id', validate('authors-get'), AuthorsController.get);
router.post(
	'/',
	authorize(false, 'admin', 'moderator'),
	validate('authors-create'),
	upload.fields([
		{ name: 'author-image', maxCount: 1 },
		{ name: 'book-image', maxCount: 1 },
		{ name: 'book-file', maxCount: 1 },
	]),
	AuthorsController.create
);
router.put(
	'/:id',
	authorize(false, 'admin', 'moderator'),
	validate('authors-update'),
	upload.fields([{ name: 'author-image', maxCount: 1 }]),
	AuthorsController.update
);
router.delete(
	'/:id',
	authorize(false, 'admin', 'moderator'),
	validate('authors-delete'),
	AuthorsController.delete
);

export default router;
