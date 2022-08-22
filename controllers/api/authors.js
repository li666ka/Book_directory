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
const utils_1 = __importDefault(require("../../utils/utils"));
const author_1 = __importDefault(require("../../models/author"));
function addAuthor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        const name = req.body.name;
        const dateBirth = req.body.birth_date;
        const dateDeath = req.body.birth_date;
        const infoUrl = utils_1.default.createAuthorInfoUrl(name, req.body.info);
        yield infoUrl;
        yield author_1.default.addAuthor(name, dateBirth, dateDeath, infoUrl);
        res.json({ result: `Author ${req.body.name} was added successfully` });
    });
}
function getAuthorNames(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        const names = yield author_1.default.getAuthorNames();
        res.json({ names });
    });
}
function getAuthorInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('params', req.params);
        try {
            const author = yield author_1.default.getAuthorById(req.params.id);
            const root = utils_1.default.getFileRoot(author.info_url);
            res.sendFile(root);
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.default = { addAuthor, getAuthorNames, getAuthorInfo };
