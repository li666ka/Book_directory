import { OkPacket, RowDataPacket } from 'mysql2';

import RolesQueries from '../db/queries/roles.queries';
import DB_CONNECTION from '../services/db.connector';

export interface Role extends RowDataPacket {
	id: number;
	name: string;
}

export class RoleRepository {
	public static async getAll(): Promise<Role[]> {
		const query: string = RolesQueries.GetAll;
		const [rows] = await DB_CONNECTION.promise().query<Role[]>(query);
		return rows;
	}

	public static async get(id: number): Promise<Role | undefined> {
		const query: string = RolesQueries.Get;
		const values: any[] = [id];
		const [rows] = await DB_CONNECTION.promise().query<Role[]>(query, values);
		return rows[0];
	}

	public static async create(name: string): Promise<OkPacket> {
		const query: string = RolesQueries.Create;
		const values: any[] = [name];
		const [okPacket] = await DB_CONNECTION.promise().query<OkPacket>(query, values);
		return okPacket;
	}

	public static async update(newName: string, id: number): Promise<void> {
		const query: string = RolesQueries.Update;
		const values: any[] = [newName, id];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async delete(id: number): Promise<void> {
		const query: string = RolesQueries.Delete;
		const values: any[] = [id];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}
}
