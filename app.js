const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const homePageRouter = require('./routes/home');
const apiBooksRouter = require('./routes/api/books');
const apiAuthorsRouter = require('./routes/api/authors');

const app = express();

// register view engine
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homePageRouter);
app.use('/api/books', apiBooksRouter);
app.use('/api/authors', apiAuthorsRouter);

module.exports = app;