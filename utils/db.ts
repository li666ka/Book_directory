import mysql from 'mysql2';

import Db from '../configs/db-config';

const connection = mysql.createConnection(Db.connectionUri);

async function initialize() {
    await executeQuery(Db.createAuthorTableQuery);
    await executeQuery(Db.createBookTableQuery);
}

export async function executeQuery(query: string) {
    try {
        const res = await connection.promise().query(query);
        return res[0];
    } catch (err) {
        console.log(err);
    }
}

export default { executeQuery, initialize };
