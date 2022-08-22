import { executeQuery } from '../utils/db';

async function addAuthor(name: any, dateBirth: any, dateDeath: any, infoUrl: any) {
    let query =
        'INSERT INTO Author (' +
        'name, ' +
        'birth_date) ' +
        `VALUES ( 
            '${name}', 
            '${dateBirth}')`;

    await executeQuery(query);

    if (dateDeath) {
        query =
            'UPDATE Author ' +
            `SET death_date = '${dateDeath}' ` +
            `WHERE name = '${name}'`;
        await executeQuery(query);
    }

    if (infoUrl) {
        const query =
            'UPDATE Author ' +
            `SET info_url = '${infoUrl}' ` +
            `WHERE name = '${name}'`;
        await executeQuery(query);
    }
}

async function getAuthorNames() {
    const query = 'SELECT name FROM Author';
    return await executeQuery(query);
}

async function getAuthorIdByName(name: any) {
    const query = `SELECT id FROM Author WHERE name = '${name}'`;
    const res = await executeQuery(query);
    // @ts-ignore
    return res[0].id;
}

async function getAuthorById(id: any) {
    const query = `SELECT * FROM Author WHERE id = ${id}`;
    const res = await executeQuery(query);
    // @ts-ignore
    return res[0];
}

export default {
    addAuthor,
    getAuthorNames,
    getAuthorIdByName,
    getAuthorById
};