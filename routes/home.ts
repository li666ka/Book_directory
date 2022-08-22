import { Router } from 'express';

const router: Router = Router();

/* GET home page. */
router.get('/', (req: any, res: { render: (arg0: string) => void; }) => {
    res.render('home');
});

export default router;
