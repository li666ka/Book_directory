import { Router } from 'express';

const router: Router = Router();

/* GET home page. */
router.get('/', (req: any, res: any) => {
    res.render('home');
});

export = router;
