import { Router } from 'express';

import UsersController from '../controllers/users/users.controller';
import AuthController from '../controllers/auth/auth.controller';
import BooklistItemsController from '../controllers/booklist_items/booklist_items.controller';

import { validate } from '../middlewares/validation';
import { authorize } from '../middlewares/authorization';

const router: Router = Router();

router.get(
	'/',
	authorize(false, 'admin'),
	validate('users-get-all'),
	UsersController.getAll
);
router.get('/:id', validate('users-get'), UsersController.get);
router.put('/:id', authorize(true), validate('users-update'), UsersController.update);
router.patch(
	'/:id/role',
	authorize(false, 'admin'),
	validate('users-update-role'),
	UsersController.updateRole
);
router.delete(
	'/:id',
	authorize(false, 'admin'),
	validate('users-delete'),
	UsersController.delete
);

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
	BooklistItemsController.create
);
router.put(
	'/:userId/books/:bookId',
	authorize(true),
	validate('booklist-items-update'),
	BooklistItemsController.update
);
router.delete(
	'/:userId/books/:bookId',
	authorize(true),
	validate('booklist-items-delete'),
	BooklistItemsController.delete
);

export default router;
