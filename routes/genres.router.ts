import { Router } from 'express';

import GenresController from '../controllers/genres.controller';

const router: Router = Router();

router.get('/', GenresController.getAll);

export default router;
