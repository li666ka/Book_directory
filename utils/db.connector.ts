import mysql, { Connection } from 'mysql2';
import { connectionConfig } from '../configs/db.config';

const DB_CONNECTION = mysql.createConnection(connectionConfig);

export default DB_CONNECTION;
