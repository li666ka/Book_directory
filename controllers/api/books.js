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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const formidable_1 = __importDefault(require("formidable"));
const uuid_1 = require("uuid");
const book_1 = __importDefault(require("../../models/book"));
const author_1 = __importDefault(require("../../models/author"));
const utils_1 = __importDefault(require("../../utils/utils"));
function getBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.query);
        let books = yield book_1.default.getBooks(req.query.book_title, req.query.author_name);
        books.forEach((elem) => {
            elem.description_url = fs_1.default.readFileSync(path_1.default.join(utils_1.default.getDataRoot() + elem.description_url), 'utf8');
        });
        console.log(books);
        res.json({ books });
    });
}
function addBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        const form = new formidable_1.default.IncomingForm();
        form.parse(req, (err, fields, files) => __awaiter(this, void 0, void 0, function* () {
            console.log(fields);
            const id = (0, uuid_1.v1)();
            const authorName = fields.author_name;
            const title = fields.book_title;
            const [authorId, url, descUrl] = yield Promise.all([
                author_1.default.getAuthorIdByName(authorName),
                utils_1.default.createBookUrl(id, authorName, title, files.book_file),
                utils_1.default.createBookDescriptionUrl(id, authorName, title, fields.book_desc)
            ]);
            yield book_1.default.addBook(id, authorId, title, descUrl, url);
            res.json({ result: 'Book was added successfully' });
        }));
    });
}
function getBookFile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('params', req.params);
        try {
            const book = yield book_1.default.getBookById(req.params.id);
            const root = utils_1.default.getFileRoot(book.url);
            res.sendFile(root);
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.default = { getBooks, addBook, getBookFile };
