const fs = require('fs');

async function createAuthorInfoUrl(name, info) {
    let n = name.replaceAll(' ', '_');
    const dir = `./data/${n}`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    const pathOfInfo = `./data/${n}/${n}.txt`;
    await new Promise( (resolve, reject) => {
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

async function createBookDescriptionUrl(id, authorName, title, description) {
    let a = authorName.replaceAll(' ', '_');
    let t = title.replaceAll(' ', '_');
    const dir = `./data/${a}/${id}_${t}`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    const urlDesc = dir + `/${id}_${t}_desc.txt`;
    await new Promise( (resolve, reject) => {
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

async function createBookUrl(id, authorName, title, file) {
    let a = authorName.replaceAll(' ', '_');
    let t = title.replaceAll(' ', '_');
    const dir = `./data/${a}/${id}_${t}`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }


    const oldPath = file.filepath;
    const url = dir + `/${id}_${t}.pdf`;

    await new Promise((resolve, reject) => {
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

module.exports = { createAuthorInfoUrl, createBookDescriptionUrl, createBookUrl };
