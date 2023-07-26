import { OkPacket, RowDataPacket } from 'mysql2';

import DB_CONNECTION from '../services/db.service';
import UsersQueries from '../db/queries/users.queries';

export interface User extends RowDataPacket {
	id: number;
	role_id: number;
	username: string;
	password: string;
	created_at: string;
}

export class UserRepository {
	public static async getAll(): Promise<User[]> {
		const query: string = UsersQueries.GetAll;
		const [rows] = await DB_CONNECTION.promise().query<User[]>(query);
		return rows;
	}

	public static async get(id: number): Promise<User | undefined> {
		const query: string = UsersQueries.Get;
		const values: any[] = [id];

		const [rows] = await DB_CONNECTION.promise().query<User[]>(query, values);
		return rows[0];
	}

	public static async create(
		roleId: number,
		username: string,
		password: string
	): Promise<OkPacket> {
		const query: string = UsersQueries.Create;
		const values: any[] = [roleId, username, password];

		const [okPacket] = await DB_CONNECTION.promise().execute<OkPacket>(query, values);
		return okPacket;
	}

	public static async update(
		newRoleId: number,
		newUsername: string,
		newPassword: string,
		id: number
	): Promise<void> {
		const query: string = UsersQueries.Update;
		const values: any[] = [newRoleId, newUsername, newPassword, id];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async delete(id: number): Promise<void> {
		const query: string = UsersQueries.Delete;
		const values: any[] = [id];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}
}
