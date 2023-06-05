import DB_CONNECTION from '../utils/db.connector';
import GenresQueries from '../db/queries/genres.queries';
import { RowDataPacket } from 'mysql2';

export interface Genre extends RowDataPacket {
	id: number;
	name: string;
}

export class GenreRepository {
	public static async get(): Promise<Genre[] | never> {
		const query: string = GenresQueries.GetAll;
		const [rows] = await DB_CONNECTION.promise().query<Genre[]>(query);
		return rows;
	}

	public static async getById(id: number): Promise<Genre | never> {
		let query: string = GenresQueries.GetById;
		let values: number[] = [id];
		const [rows] = await DB_CONNECTION.promise().query<Genre[]>(query, values);
		return rows[0];
	}
}

export default Genre;
