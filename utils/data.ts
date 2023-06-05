import fs from 'fs';
import path from 'path';

import { UrlData } from '../interfaces/url-data';
import { CONTENT_ROOT } from '../configs/db.config';

async function createAuthorInfoFile(urlData: UrlData, info: string): Promise<void> {
    const dir: string = CONTENT_ROOT + urlData.dirName;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    const fullUrl: string = CONTENT_ROOT + urlData.url;

    await new Promise<void>((resolve, reject) => {
        fs.writeFile(
            fullUrl,
            info,
            (error) => {
                if (error) {
                    reject(error);
                    return;
                }

                fs.readFile(fullUrl, 'utf8',  (err, data) => {
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
}

function deleteAuthorDirByDirName(dirName: string): void {
    fs.rmSync(path.join(CONTENT_ROOT, dirName), { recursive: true, force: true });
}

export default { createAuthorInfoFile, deleteAuthorDirByDirName };
