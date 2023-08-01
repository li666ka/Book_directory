import { createConnection } from 'mysql2';
import { connectionConfig } from '../configs/db.config';

const DB_CONNECTION = createConnection(connectionConfig);

export default DB_CONNECTION;
