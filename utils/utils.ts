import fs from 'fs';
import path from "path";

import { dataUri } from '../configs/db-config';

async function createAuthorInfoUrl(name: { replaceAll: (arg0: string, arg1: string) => any; }, info: string | NodeJS.ArrayBufferView) {
    let n = name.replaceAll(' ', '_');
    const dir = `./data/${n}`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    const pathOfInfo = `./data/${n}/${n}.txt`;
    await new Promise<void>( (resolve, reject) => {
        fs.writeFile(
            pathOfInfo,
            info,
            (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                fs.readFile(pathOfInfo, 'utf8',  (err, data) => {
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
}

async function createBookDescriptionUrl(id: any, authorName: any, title: any, description: any) {
    let a = authorName.replaceAll(' ', '_');
    let t = title.replaceAll(' ', '_');
    const dir = `./data/${a}/${id}_${t}`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    const urlDesc = dir + `/${id}_${t}_desc.txt`;
    await new Promise<void>( (resolve, reject) => {
        fs.writeFile(
            urlDesc,
            description,
            (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                fs.readFile(urlDesc, 'utf8',  (err, data) => {
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
}

async function createBookUrl(id: any, authorName: any, title: any, file: any) {
    let a = authorName.replaceAll(' ', '_');
    let t = title.replaceAll(' ', '_');
    const dir = `./data/${a}/${id}_${t}`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }


    const oldPath = file.filepath;
    const url = dir + `/${id}_${t}.pdf`;

    await new Promise<void>((resolve, reject) => {
        fs.rename(oldPath, url, (err) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve();
        });
    });

    return url;
}

function getFileRoot(url: string) {
    return path.join(getDataRoot(), url);
}

function getDataRoot() {
    return path.join(path.dirname(__dirname), dataUri);
}

export default { createAuthorInfoUrl, createBookDescriptionUrl, createBookUrl, getFileRoot, getDataRoot };
