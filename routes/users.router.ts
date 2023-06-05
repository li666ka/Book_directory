import { Router } from 'express';

import UsersController from '../controllers/users.controller';

const router: Router = Router();

router.get('/', UsersController.list);
router.get('/:id', UsersController.get);
router.get('/:id/books', UsersController.getUserBooks);

router.post('/signup', UsersController.create);
router.post('/signin', UsersController.authenticate);

export default router;
