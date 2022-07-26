const Db = require('../db/db');

async function addAuthor(name, dateBirth, dateDeath, infoUrl) {
    let query =
        'INSERT INTO Author (' +
        'name, ' +
        'birth_date) ' +
        `VALUES ( 
            '${name}', 
            '${dateBirth}')`;

    await Db.executeQuery(query);

    if (dateDeath) {
        query =
            'UPDATE Author ' +
            `SET death_date = '${dateDeath}' ` +
            `WHERE name = '${name}'`;
        await Db.executeQuery(query);
    }

    if (infoUrl) {
        const query =
            'UPDATE Author ' +
            `SET info_url = '${infoUrl}' ` +
            `WHERE name = '${name}'`;
        await Db.executeQuery(query);
    }
}

async function getAuthorNames() {
    const query = 'SELECT name FROM Author';
    return await Db.executeQuery(query);
}

async function getAuthorIdByName(name) {
    const query = `SELECT id FROM Author WHERE name = '${name}'`;
    const res = await Db.executeQuery(query);
    return res[0].id;
}

async function getAuthorById(id) {
    const query = `SELECT * FROM Author WHERE id = ${id}`;
    const res = await Db.executeQuery(query);
    return res[0];
}

module.exports = {
    addAuthor,
    getAuthorNames,
    getAuthorIdByName,
    getAuthorById
};