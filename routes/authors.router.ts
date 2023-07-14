import { Router } from 'express';

import AuthorsController from '../controllers/authors/authors.controller';
import AuthService from '../services/auth.service';

import { upload } from '../configs/multer.config';

const router: Router = Router();

router.get('/', AuthorsController.getAll);
router.get('/:id', AuthorsController.get);
router.post(
	'/',
	// AuthService.verify,
	// AuthService.requireAdminOrModerator,
	upload.fields([
		{ name: 'author-image', maxCount: 1 },
		{ name: 'book-image', maxCount: 1 },
		{ name: 'book-file', maxCount: 1 },
	]),
	AuthorsController.create
);
// // router.put('/:id', AuthorsController.update);
// router.delete('/:id', AuthorsController.delete);

export default router;
