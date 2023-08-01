import { Router } from 'express';

import AuthorsController from '../controllers/authors/authors.controller';
import { AUTHOR_IMAGE_FIELD, upload } from '../utils/multer.util';
import { authorize } from '../middlewares/authorization';
import { validate } from '../middlewares/validation';

const router: Router = Router();

router.get('/', validate('authors-get-all'), AuthorsController.getAll);
router.get('/:id', AuthorsController.get);
router.post(
	'/',
	authorize(false, 'admin', 'moderator'),
	validate('authors-create'),
	AuthorsController.create
);

router.post(
	'/:id/image',
	authorize(false, 'admin', 'moderator'),
	upload.single(AUTHOR_IMAGE_FIELD),
	validate('authors-upload-image'),
	AuthorsController.uploadImage
);

router.put(
	'/:id',
	authorize(false, 'admin', 'moderator'),
	validate('authors-update'),
	AuthorsController.update
);

router.delete('/:id', authorize(false, 'admin', 'moderator'), AuthorsController.delete);

export default router;
