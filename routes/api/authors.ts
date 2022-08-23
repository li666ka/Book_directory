import { Router } from 'express';

import AuthorsController from '../../controllers/api/authors';

const router: Router = Router();

/* Add author */
router.post('/addAuthor', AuthorsController.addAuthor);

/* GET authors names */
router.get('/names', AuthorsController.getAuthorNames);

/* GET author info */
router.get('/:id', AuthorsController.getAuthorInfo);

export = router;
