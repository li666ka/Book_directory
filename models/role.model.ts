import { OkPacket, RowDataPacket } from 'mysql2';

import RolesQueries from '../db/queries/roles.queries';
import DB_CONNECTION from '../services/db.connector';

export interface Role extends RowDataPacket {
	id: number;
	name: string;
}

export enum Roles {
	User = 1,
	Moderator,
	Admin,
}

export class RoleRepository {
	public static async getAll(): Promise<Role[] | never> {
		const query: string = RolesQueries.GetAll;
		const [rows] = await DB_CONNECTION.promise().query<Role[]>(query);
		return rows;
	}

	public static async get(id: number): Promise<Role | undefined | never> {
		const query: string = RolesQueries.Get;
		const values: any[] = [id];
		const [rows] = await DB_CONNECTION.promise().query<Role[]>(query, values);
		return rows[0];
	}

	public static async create(name: string): Promise<void | never> {
		const query: string = RolesQueries.Create;
		const values: any[] = [name];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async update(n_name: string, id: number): Promise<void | never> {
		const query: string = RolesQueries.Update;
		const values: any[] = [n_name, id];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async delete(id: number): Promise<void | never> {
		const query: string = RolesQueries.Delete;
		const values: any[] = [id];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}
}
