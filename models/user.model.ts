import { OkPacket, RowDataPacket } from 'mysql2';

import DB_CONNECTION from '../utils/db.connector';
import UsersQueries from '../db/queries/users.queries';

export interface User extends RowDataPacket {
	id: number;
	role_id: number;
	username: string;
	password: string;
	created_at: string;
}

export class UserRepository {
	public static async get(): Promise<User[] | never> {
		const query: string = UsersQueries.GetAll;
		const [rows] = await DB_CONNECTION.promise().query<User[]>(query);
		return rows;
	}

	public static async getById(id: number): Promise<User> {
		const query: string = UsersQueries.GetById;
		const values: any[] = [id];

		const [rows] = await DB_CONNECTION.promise().query<User[]>(query, values);
		return rows[0];
	}

	public static async getByUsername(username: string): Promise<User> {
		const query: string = UsersQueries.GetByUsername;
		const values: any[] = [username];

		const [rows] = await DB_CONNECTION.promise().query<User[]>(query, values);
		return rows[0];
	}

	public static async create(
		roleId: number,
		username: string,
		password: string
	): Promise<User> {
		const query: string = UsersQueries.Create;
		const values: any[] = [roleId, username, password];

		//await validateSqlQuery(query, values);

		await DB_CONNECTION.promise().execute<OkPacket>(query, values);

		return await this.getByUsername(username);
	}
}

export default User;
