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
function addAuthor(name, dateBirth, dateDeath, infoUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = 'INSERT INTO Author (' +
            'name, ' +
            'birth_date) ' +
            `VALUES ( 
            '${name}', 
            '${dateBirth}')`;
        yield (0, db_1.executeQuery)(query);
        if (dateDeath) {
            query =
                'UPDATE Author ' +
                    `SET death_date = '${dateDeath}' ` +
                    `WHERE name = '${name}'`;
            yield (0, db_1.executeQuery)(query);
        }
        if (infoUrl) {
            const query = 'UPDATE Author ' +
                `SET info_url = '${infoUrl}' ` +
                `WHERE name = '${name}'`;
            yield (0, db_1.executeQuery)(query);
        }
    });
}
function getAuthorNames() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = 'SELECT name FROM Author';
        return yield (0, db_1.executeQuery)(query);
    });
}
function getAuthorIdByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `SELECT id FROM Author WHERE name = '${name}'`;
        const res = yield (0, db_1.executeQuery)(query);
        return res[0].id;
    });
}
function getAuthorById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `SELECT * FROM Author WHERE id = ${id}`;
        const res = yield (0, db_1.executeQuery)(query);
        return res[0];
    });
}
exports.default = {
    addAuthor,
    getAuthorNames,
    getAuthorIdByName,
    getAuthorById
};
