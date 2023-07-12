import { Router } from 'express';

import AuthorsController from '../controllers/authors/authors.controller';

const router: Router = Router();

router.get('/', AuthorsController.getAll);
// router.get('/:id', AuthorsController.get);
// router.get('/:id/books', AuthorsController.books);
// router.post('/', AuthorsController.create);
// // router.put('/:id', AuthorsController.update);
// router.delete('/:id', AuthorsController.delete);

export = router;
