import { Router } from 'express';
import BooksGenresController from '../controllers/books_genres.controller';

const router: Router = Router();

router.get('/:bookId/genres', BooksGenresController.list);

export default router;
