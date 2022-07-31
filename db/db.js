const mysql = require('mysql2');

const { connectionUri, createAuthorTable, createBookTable } = require('./config');

const connection = mysql.createConnection(connectionUri);

executeQuery(createAuthorTable);
executeQuery(createBookTable);

async function executeQuery(query) {
    try {
        const res = await connection.promise().query(query);
        return res[0];
    } catch (err) {
        console.log(err);
    }
}

module.exports = { executeQuery };
