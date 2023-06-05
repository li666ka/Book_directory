import { RowDataPacket } from 'mysql2';
import DB_CONNECTION from '../utils/db.connector';
import StatusesQueries from '../db/queries/statuses.queries';

export interface Status extends RowDataPacket {
	id: number;
	name: number;
}

export class StatusRepository {
	public static async get(): Promise<Status[]> {
		const query: string = StatusesQueries.GetAll;
		const [rows] = await DB_CONNECTION.promise().query<Status[]>(query);
		return rows;
	}

	public static async getById(id: number): Promise<Status> {
		const query: string = StatusesQueries.GetById;
		const values: any[] = [id];
		const [rows] = await DB_CONNECTION.promise().query<Status[]>(query, values);
		return rows[0];
	}
}

export default Status;
