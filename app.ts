import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import routes from './routes/all';
import corsOption from './configs/cors.config';

const app: Express = express();
const port: number = 4000;

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});

app.use(express.static('content'));
app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/books', routes.books);
app.use('/books', routes.books_genres);
app.use('/books', routes.books_reviews);

app.use('/authors', routes.authors);
app.use('/genres', routes.genres);

app.use('/users', routes.users);
app.use('/users', routes.users_books);

app.use('/statuses', routes.statuses);
