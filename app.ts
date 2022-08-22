import express, { Express } from 'express';
import path from 'path';
//import cookieParser from 'cookie-parser';
import logger from 'morgan';

import Db from './utils/db';
import homePageRouter from './routes/home';
import apiBooksRouter from './routes/api/books';
import apiAuthorsRouter from './routes/api/authors';

const app: Express = express();
const port: number = 8888;

/* db setup */
Db.initialize()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

// register view engine
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homePageRouter);
app.use('/api/books', apiBooksRouter);
app.use('/api/authors', apiAuthorsRouter);
