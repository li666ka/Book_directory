import { Router } from 'express';

import UsersController from '../controllers/users/users.controller';
import AuthController from '../controllers/auth/auth.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import RoleName from '../configs/roles.config';

const router: Router = Router();

router.get('/', AuthMiddleware.require(false, RoleName.Admin), UsersController.getAll);
router.get('/:id', UsersController.get);
router.post('/signup', AuthController.createUser);
router.post(
	'/signup/moderator',
	AuthMiddleware.require(false, RoleName.Admin),
	AuthController.createModerator
);
router.post(
	'/signup/admin',
	AuthMiddleware.require(false, RoleName.Admin),
	AuthController.createAdmin
);
router.post('/signin', AuthController.login);
router.put('/:id', AuthMiddleware.require(true), UsersController.update);
router.patch(
	'/:id/role',
	AuthMiddleware.require(false, RoleName.Admin),
	UsersController.updateRole
);
router.delete(
	'/:id',
	AuthMiddleware.require(false, RoleName.Admin),
	UsersController.delete
);

export default router;
