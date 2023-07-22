import { Router } from 'express';
import GenresController from '../controllers/genres/genres.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import RoleName from '../configs/roles.config';

const router: Router = Router();

router.get('/', GenresController.getAll);
router.get('/', GenresController.get);
router.post(
	'/',
	AuthMiddleware.require(false, RoleName.Admin, RoleName.Moderator),
	GenresController.create
);
router.put(
	'/:id',
	AuthMiddleware.require(false, RoleName.Admin, RoleName.Moderator),
	GenresController.update
);
router.delete(
	'/:id',
	AuthMiddleware.require(false, RoleName.Admin, RoleName.Moderator),
	GenresController.delete
);

export default router;
