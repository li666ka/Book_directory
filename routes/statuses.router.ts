import { Router } from 'express';
import StatusesController from '../controllers/statuses/statuses.controller';
import { authorize } from '../middlewares/authorization';
import { validate } from '../middlewares/validation';

const router: Router = Router();

router.get('/', StatusesController.getAll);
router.get('/:id', StatusesController.get);
router.post(
	'/',
	authorize(false, 'admin', 'moderator'),
	validate('statuses-create'),
	StatusesController.create
);
router.put(
	'/:id',
	authorize(false, 'admin', 'moderator'),
	validate('statuses-update'),
	StatusesController.update
);
router.delete('/:id', authorize(false, 'admin', 'moderator'), StatusesController.delete);

export default router;
