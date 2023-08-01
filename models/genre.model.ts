import { OkPacket, RowDataPacket } from 'mysql2';

import DB_CONNECTION from '../utils/db.util';
import GenresQueries from '../db/queries/genres.queries';

export interface Genre extends RowDataPacket {
	id: number;
	name: string;
}

export class GenreRepository {
	public static async getAll(): Promise<Genre[]> {
		const query: string = GenresQueries.GetAll;
		const [rows] = await DB_CONNECTION.promise().query<Genre[]>(query);
		return rows;
	}

	public static async get(id: number): Promise<Genre | undefined> {
		const query: string = GenresQueries.Get;
		const values: any[] = [id];
		const [rows] = await DB_CONNECTION.promise().query<Genre[]>(query, values);
		return rows[0];
	}

	public static async create(name: string): Promise<OkPacket> {
		const query: string = GenresQueries.Create;
		const values: any[] = [name];
		const res = await DB_CONNECTION.promise().query<OkPacket>(query, values);
		return res[0];
	}

	public static async update(n_name: string, id: number): Promise<void> {
		const query: string = GenresQueries.Update;
		const values: any[] = [n_name, id];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async delete(id: number): Promise<void> {
		const query: string = GenresQueries.Delete;
		const values: any[] = [id];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}
}
