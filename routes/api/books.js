"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const books_1 = __importDefault(require("../../controllers/api/books"));
const router = (0, express_1.Router)();
router.get('/', books_1.default.getBooks);
router.post('/addBook', books_1.default.addBook);
router.get('/:id', books_1.default.getBookFile);
exports.default = router;
