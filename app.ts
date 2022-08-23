import express, { Express } from 'express';
import path from 'path';
//import cookieParser from 'cookie-parser';
import logger from 'morgan';
import requireDirectory from 'require-directory';

import Db from './utils/db';

const app: Express = express();
const port: number = 8888;
const routes = requireDirectory(module, './routes');

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

app.use('/', routes.home);
app.use('/api/books', routes.api.books);
app.use('/api/authors', routes.api.authors);

console.log(routes);
