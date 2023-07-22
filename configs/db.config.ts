import 'dotenv/config';

export const connectionConfig: object = {
	host: process.env.MYSQL_HOST,
	port: process.env.MYSQL_PORT,
	user: process.env.MYSQL_USER,
	database: process.env.MYSQL_DATABASE,
	password: process.env.MYSQL_PASSWORD,
};

export default connectionConfig;
