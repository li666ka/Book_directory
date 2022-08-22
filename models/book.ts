import { executeQuery } from '../utils/db';

async function getBooks(title: any, authorName: any) {
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
    return await executeQuery(query);
}

async function getBookById(id: any) {
    const query = `SELECT * FROM Book WHERE id = '${id}'`;
    const result = await executeQuery(query);
    // @ts-ignore
    return result[0];
}

async function addBook(id: any, authorId: any, title: any, descUrl: any, url: any) {
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

    return await executeQuery(query);
}

export default {
    getBooks,
    getBookById,
    addBook,
};