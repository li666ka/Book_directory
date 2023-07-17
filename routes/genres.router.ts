import { Router } from 'express';
import GenresController from '../controllers/genres/genres.controller';

const router: Router = Router();

router.get('/', GenresController.getAll);
router.get('/', GenresController.get);
router.post(
	'/',
	// AuthService.verify,
	// AuthService.requireAdminOrModerator,
	GenresController.create
);
router.put(
	'/:id',
	// AuthService.verify,
	// AuthService.requireAdminOrModerator,
	GenresController.update
);
router.delete(
	'/:id',
	// AuthService.verify,
	// AuthService.requireAdminOrModerator,
	GenresController.delete
);

export default router;
