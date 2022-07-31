const { Router } = require('express');
const formidable = require('formidable');
const fs = require('fs');
const { v1: uuidv1 } = require('uuid');

const Book = require("../../models/book");
const Author = require("../../models/author");
const Utils = require("../../utils/utils");

const router = Router();

/* GET list of books */
router.get('/', (req, res, next) => {
    console.log(req.query);
    Book.getBooks(req.query.book_title, req.query.author_name)
        .then(books => {
            books.forEach(elem => {
                elem.description_url = fs.readFileSync(elem.description_url, 'utf8');
            });
            console.log(books);
            res.json({ books });
        });
});

/* POST Add book */
router.post('/addBook', (req, res) => {
    console.log(req.body);

    const form = new formidable.IncomingForm();
    
    form.parse(req, async (err, fields, files) => {
        console.log(fields);

        const id = uuidv1();
        const authorName = fields.author_name;
        const title = fields.book_title;

        const [ authorId, url, descUrl ] = await Promise.all([
            Author.getAuthorIdByName(authorName),
            Utils.createBookUrl(id, authorName, title, files.book_file),
            Utils.createBookDescriptionUrl(id, authorName, title, fields.book_desc)
        ]);

        Book.addBook(id, authorId, title, descUrl, url).then(r => {
            res.render('home');
        });
    });

});

/* GET book file */
router.get('/:id', (req, res, next) => {
    console.log('params', req.params);
    Book.getBookById(req.params.id)
        .then(book => {
            let l = __dirname;
            l = l.slice(0, l.length - 10);
            const newUrl = require('path').normalize(l + book[0].url);
            res.sendFile(newUrl);
        })
        .catch(err => console.log(err));
});

module.exports = router;