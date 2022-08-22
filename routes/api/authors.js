"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authors_1 = __importDefault(require("../../controllers/api/authors"));
const router = (0, express_1.Router)();
router.post('/addAuthor', authors_1.default.addAuthor);
router.get('/names', authors_1.default.getAuthorNames);
router.get('/:id', authors_1.default.getAuthorInfo);
exports.default = router;
