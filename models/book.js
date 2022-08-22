"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
function getBooks(title, authorName) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = 'SELECT Book.id, Book.title, ' +
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
        return yield (0, db_1.executeQuery)(query);
    });
}
function getBookById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `SELECT * FROM Book WHERE id = '${id}'`;
        const result = yield (0, db_1.executeQuery)(query);
        return result[0];
    });
}
function addBook(id, authorId, title, descUrl, url) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = 'INSERT INTO Book (' +
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
        return yield (0, db_1.executeQuery)(query);
    });
}
exports.default = {
    getBooks,
    getBookById,
    addBook,
};
