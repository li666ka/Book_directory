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
const db_config_1 = require("../configs/db-config");
function createAuthorInfoUrl(name, info) {
    return __awaiter(this, void 0, void 0, function* () {
        let n = name.replaceAll(' ', '_');
        const dir = `./data/${n}`;
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir);
        }
        const pathOfInfo = `./data/${n}/${n}.txt`;
        yield new Promise((resolve, reject) => {
            fs_1.default.writeFile(pathOfInfo, info, (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                fs_1.default.readFile(pathOfInfo, 'utf8', (err, data) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log('Async writing finished. File consists:');
                    console.log(data);
                });
                resolve();
            });
        });
        return pathOfInfo;
    });
}
function createBookDescriptionUrl(id, authorName, title, description) {
    return __awaiter(this, void 0, void 0, function* () {
        let a = authorName.replaceAll(' ', '_');
        let t = title.replaceAll(' ', '_');
        const dir = `./data/${a}/${id}_${t}`;
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir);
        }
        const urlDesc = dir + `/${id}_${t}_desc.txt`;
        yield new Promise((resolve, reject) => {
            fs_1.default.writeFile(urlDesc, description, (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                fs_1.default.readFile(urlDesc, 'utf8', (err, data) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log('Async writing finished. File consists:');
                    console.log(data);
                });
                resolve();
            });
        });
        return urlDesc;
    });
}
function createBookUrl(id, authorName, title, file) {
    return __awaiter(this, void 0, void 0, function* () {
        let a = authorName.replaceAll(' ', '_');
        let t = title.replaceAll(' ', '_');
        const dir = `./data/${a}/${id}_${t}`;
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir);
        }
        const oldPath = file.filepath;
        const url = dir + `/${id}_${t}.pdf`;
        yield new Promise((resolve, reject) => {
            fs_1.default.rename(oldPath, url, (err) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve();
            });
        });
        return url;
    });
}
function getFileRoot(url) {
    return path_1.default.join(getDataRoot(), url);
}
function getDataRoot() {
    return path_1.default.join(path_1.default.dirname(__dirname), db_config_1.dataUri);
}
exports.default = { createAuthorInfoUrl, createBookDescriptionUrl, createBookUrl, getFileRoot, getDataRoot };
