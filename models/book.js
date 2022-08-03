const Db = require('../db/db');

async function getBooks(title, authorName) {
    let query =
        'SELECT Book.id, Book.title, ' +
            'Author.name AS author_name, Author.id AS author_id, ' +
            'Book.description_url, Book.url ' +
        'FROM Book JOIN Author ON Book.author_id = Author.id';

    if (title) {
        query += ` WHERE title LIKE '%${title}%'`;
    }

    if (authorName) {
        (title) ?
            query += ` AND author_id = ( 
                            SELECT id 
                            FROM Author 
                            WHERE name LIKE '%${authorName}%' )`
            : query += ` WHERE author_id = ( 
                            SELECT id 
                            FROM Author 
                            WHERE name LIKE '%${authorName}%' )`;
    }

    console.log(query);
    return await Db.executeQuery(query);
}

async function getBookById(id) {
    const query = `SELECT * FROM Book WHERE id = '${id}'`;
    const result = await Db.executeQuery(query);
    return result[0];
}

async function addBook(id, authorId, title, descUrl, url) {
    // ? validation

    let query =
        'INSERT INTO Book (' +
            'id, ' +
            'author_id, ' +
            'title, ' +
            'description_url, ' +
            'url) ' +
        `VALUES (
            '${id}',
            ${authorId}, 
            '${title}',  
            '${descUrl}', 
            '${url}')`;

    return await Db.executeQuery(query);
}

module.exports = {
    getBooks,
    getBookById,
    addBook,
};