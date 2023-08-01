import { Router } from 'express';
import GenresController from '../controllers/genres/genres.controller';
import { authorize } from '../middlewares/authorization';
import { validate } from '../middlewares/validation';

const router: Router = Router();

router.get('/', validate('genres-get-all'), GenresController.getAll);
router.get('/', GenresController.get);
router.post(
	'/',
	authorize(false, 'admin', 'moderator'),
	validate('genres-create'),
	GenresController.create
);
router.put(
	'/:id',
	authorize(false, 'admin', 'moderator'),
	validate('genres-update'),
	GenresController.update
);
router.delete('/:id', authorize(false, 'admin', 'moderator'), GenresController.delete);

export default router;
