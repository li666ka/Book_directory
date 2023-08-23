import { Router } from 'express';

import UsersController from '../controllers/users/users.controller';
import AuthController from '../controllers/auth/auth.controller';
import BooklistController from '../controllers/booklist/booklist.controller';

import { validate } from '../middlewares/validation';
import { authorize } from '../middlewares/authorization';

const router: Router = Router();

router.get(
	'/',
	authorize(false, 'admin'),
	validate('users-get-all'),
	UsersController.getAll
);
router.get('/:userId', UsersController.get);
router.put('/:userId', authorize(true), validate('users-update'), UsersController.update);
router.patch(
	'/:userId/role',
	authorize(false, 'admin'),
	validate('users-update-role'),
	UsersController.updateRole
);
router.delete('/:userId', authorize(false, 'admin'), UsersController.delete);

router.post('/signup', validate('auth-create-user'), AuthController.createUser);
router.post(
	'/signup/moderator',
	authorize(false, 'admin'),
	validate('auth-create-moderator'),
	AuthController.createModerator
);
router.post(
	'/signup/admin',
	authorize(false, 'admin'),
	validate('auth-create-admin'),
	AuthController.createAdmin
);
router.post('/signin', validate('auth-login'), AuthController.login);

router.post(
	'/:userId/books/:bookId',
	authorize(true),
	validate('booklist-items-create'),
	BooklistController.create
);
router.put(
	'/:userId/books/:bookId',
	authorize(true),
	validate('booklist-items-update'),
	BooklistController.update
);
router.delete('/:userId/books/:bookId', authorize(true), BooklistController.delete);

export default router;
