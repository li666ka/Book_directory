import { Router } from 'express';

import ReviewsController from '../controllers/reviews/reviews.controller';
import { validate } from '../middlewares/validation';
import { authorize } from '../middlewares/authorization';

const router: Router = Router();

router.get('/', validate('reviews-get-all'), ReviewsController.getAll);
router.get('/:userId/:bookId', ReviewsController.get);
router.post(
	'/:userId/:bookId',
	authorize(true),
	validate('reviews-create'),
	ReviewsController.create
);
router.put(
	'/:userId/:bookId',
	authorize(true),
	validate('reviews-update'),
	ReviewsController.update
);
router.delete(
	'/:userId/:bookId',
	authorize(true, 'admin', 'moderator'),
	ReviewsController.delete
);

export default router;
