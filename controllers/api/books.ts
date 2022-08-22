import fs from 'fs';
import path from 'path';
import formidable from 'formidable';
import { v1 as uuidv1 } from 'uuid';

import Book from '../../models/book';
import Author from '../../models/author';
import Utils from '../../utils/utils';

async function getBooks(req: any, res: any) {
    console.log(req.query);

    let books = await Book.getBooks(req.query.book_title, req.query.author_name);

    // @ts-ignore
    books.forEach((elem: object) => {
        // @ts-ignore
        elem.description_url = fs.readFileSync(path.join(Utils.getDataRoot() + elem.description_url), 'utf8');
    });

    console.log(books);
    res.json({ books });
}

async function addBook(req: any, res: any) {
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

        await Book.addBook(id, authorId, title, descUrl, url);

        res.json({ result: 'Book was added successfully' });
    });
}

async function getBookFile(req: any, res: any) {
    console.log('params', req.params);
    try {
        const book = await Book.getBookById(req.params.id)
        const root = Utils.getFileRoot(book.url);
        res.sendFile(root);
    } catch (err) {
        console.log(err);
    }
}

export default { getBooks, addBook, getBookFile };
