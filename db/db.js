const mysql = require('mysql2');

const { connectionUri, createAuthorTable, createBookTable } = require('./config');

const connection = mysql.createConnection(connectionUri);

executeQuery(createAuthorTable);
executeQuery(createBookTable);

function executeQuery(query) {
    return new Promise( (resolve, reject) => {
        connection.query(query, (err, rows, fields) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(rows);
        });
    });
}

module.exports = { executeQuery };
