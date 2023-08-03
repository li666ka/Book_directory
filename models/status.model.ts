import { OkPacket, RowDataPacket } from 'mysql2';

import DB_CONNECTION from '../utils/db.util';
import StatusesQueries from '../db/queries/statuses.queries';

export interface Status extends RowDataPacket {
	id: number;
	name: string;
}

export class StatusRepository {
	public static async getAll(): Promise<Status[]> {
		const query: string = StatusesQueries.GetAll;
		const [rows] = await DB_CONNECTION.promise().query<Status[]>(query);
		return rows;
	}

	public static async get(id: number): Promise<Status> {
		const query: string = StatusesQueries.Get;
		const values: any[] = [id];
		const [rows] = await DB_CONNECTION.promise().query<Status[]>(query, values);
		return rows[0];
	}

	public static async create(name: string): Promise<OkPacket> {
		const query: string = StatusesQueries.Create;
		const values: any[] = [name];
		const [okPacket] = await DB_CONNECTION.promise().query<OkPacket>(query, values);
		return okPacket;
	}

	public static async update(newName: string, id: number): Promise<void> {
		const query: string = StatusesQueries.Update;
		const values: any[] = [newName, id];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async delete(id: number): Promise<void> {
		const query: string = StatusesQueries.Delete;
		const values: any[] = [id];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}
}
