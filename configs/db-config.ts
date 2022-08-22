const connectionUri: object = {
    host: 'localhost',
    port: '8080',
    user: 'root',
    database: 'book_directory',
    password: '0000'
};

const createAuthorTableQuery : string =
    'CREATE TABLE IF NOT EXISTS Author ( ' +
        'id         int             AUTO_INCREMENT, ' +
        'name       varchar(255)    NOT NULL, ' +
        'birth_date date            NOT NULL, ' +
        'death_date date            NULL, ' +
        'info_url   varchar(255)    NULL, ' +
        'PRIMARY KEY (id), ' +
        'UNIQUE(name), ' +
        'UNIQUE(info_url)' +
    ')';

const createBookTableQuery : string =
    'CREATE TABLE IF NOT EXISTS Book ( ' +
        'id                 char(36), ' +
        'author_id          int             NOT NULL, ' +
        'title              varchar(255)    NOT NULL, ' +
        'description_url    varchar(255)    NOT NULL, ' +
        'url                varchar(255)    NOT NULL, ' +

        'PRIMARY KEY (id), ' +
        'FOREIGN KEY (author_id) REFERENCES Author(id)' +
            'ON DELETE CASCADE ' +
            'ON UPDATE CASCADE, ' +
        'UNIQUE(url), ' +
        'UNIQUE(description_url)' +
    ')';

export const dataUri: string = '/data/';

export default { connectionUri, createAuthorTableQuery, createBookTableQuery, dataUri };
