import { Router } from 'express';

import BooksController from '../controllers/books.controller';

const router: Router = Router();

router.get('/', BooksController.list);
router.get('/:id', BooksController.get);
router.get('/:id/author', BooksController.author);
router.post('/', BooksController.create);
router.put('/:id', BooksController.update);
router.delete('/:id', BooksController.delete);

export default router;
