import { OkPacket, RowDataPacket } from 'mysql2';

import DB_CONNECTION from '../services/db.connector';
import UsersQueries from '../db/queries/users.queries';

export interface User extends RowDataPacket {
	id: number;
	role_id: number;
	username: string;
	password: string;
	created_at: string;
}

export class UserRepository {
	public static async getAll(): Promise<User[] | never> {
		const query: string = UsersQueries.GetAll;
		const [rows] = await DB_CONNECTION.promise().query<User[]>(query);
		return rows;
	}

	public static async get(id: number): Promise<User> {
		const query: string = UsersQueries.Get;
		const values: any[] = [id];

		const [rows] = await DB_CONNECTION.promise().query<User[]>(query, values);
		return rows[0];
	}

	public static async create(
		roleId: number,
		username: string,
		password: string
	): Promise<void | never> {
		const query: string = UsersQueries.Create;
		const values: any[] = [roleId, username, password];

		await DB_CONNECTION.promise().execute<OkPacket>(query, values);
	}

	public static async update(
		n_roleId: number,
		n_username: string,
		n_password: string,
		id: number
	): Promise<void | never> {
		const query: string = UsersQueries.Update;
		const values: any[] = [n_roleId, n_username, n_password, id];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async delete(id: number): Promise<void | never> {
		const query: string = UsersQueries.Delete;
		const values: any[] = [id];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}
}
