import { RowDataPacket, OkPacket } from 'mysql2';

import DB_CONNECTION from '../utils/db.connector';
import AuthorsQueries from '../db/queries/authors.queries';

export interface Author extends RowDataPacket {
	id: number;
	full_name: string;
	born_at: string;
	died_at?: string;
	img_url: string;
	info: string;
	created_at: string;
}

export class AuthorRepository {
	public static async getAll(): Promise<Author[] | never> {
		let query: string = AuthorsQueries.GetAll;
		const [rows] = await DB_CONNECTION.promise().query<Author[]>(query);
		return rows;
	}

	public static async get(id: number): Promise<Author | undefined | never> {
		const query: string = AuthorsQueries.Get;
		const values: any[] = [id];

		const [rows] = await DB_CONNECTION.promise().query<Author[]>(query, values);
		return rows[0];
	}

	public static async create(
		fullName: string,
		bornAt: string,
		imgUrl: string,
		info: string,
		diedAt?: string
	): Promise<void | never> {
		const query: string = AuthorsQueries.Create;
		const values: any[] = [fullName, bornAt, diedAt, imgUrl, info];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async update(
		n_fullName: string,
		n_bornAt: string,
		n_diedAt: string,
		n_imgUrl: string,
		n_info: string,
		id: number
	): Promise<void | never> {
		const query: string = AuthorsQueries.Update;
		const values: any[] = [n_fullName, n_bornAt, n_diedAt, n_imgUrl, n_info, id];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async delete(id: number): Promise<void | never> {
		const query: string = AuthorsQueries.Delete;
		const values: any[] = [id];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}
}
