import { OkPacket, RowDataPacket } from 'mysql2';

import DB_CONNECTION from '../services/db.connector';
import StatusesQueries from '../db/queries/statuses.queries';

export interface Status extends RowDataPacket {
	id: number;
	name: number;
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

	public static async create(name: string): Promise<void | never> {
		const query: string = StatusesQueries.Create;
		const values: any[] = [name];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async update(n_name: string, id: number): Promise<void | never> {
		const query: string = StatusesQueries.Update;
		const values: any[] = [n_name, id];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async delete(id: number): Promise<void | never> {
		const query: string = StatusesQueries.Delete;
		const values: any[] = [id];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}
}

export default Status;
