import { RowDataPacket, OkPacket } from 'mysql2';

import DB_CONNECTION from '../utils/db.connector';
import AuthorsQueries from '../db/queries/authors.queries';

export interface Author extends RowDataPacket {
	id: number;
	full_name: string;
	birth_date: string;
	death_date?: string;
	img_url: string;
	info: string;
}

export class AuthorRepository {
	public static async get(fullName: string | undefined): Promise<Author[] | never> {
		let query: string = AuthorsQueries.GetAll;
		let values: any[] | undefined = undefined;
		if (fullName) {
			query = AuthorsQueries.GetAllByFullName;
			values = [`%${fullName}%`];
		}

		const [rows] = await DB_CONNECTION.promise().query<Author[]>(query, values);
		return rows;
	}

	public static async getById(id: number): Promise<Author | undefined | never> {
		const query: string = AuthorsQueries.GetById;
		const values: any[] = [id];

		const [rows] = await DB_CONNECTION.promise().query<Author[]>(query, values);
		return rows[0];
	}

	public static async getByName(name: string): Promise<Author | undefined | never> {
		const query: string = AuthorsQueries.GetByFullName;
		const values: any[] = [name];
		const [rows] = await DB_CONNECTION.promise().query<Author[]>(query, values);
		return rows[0];
	}

	public static async create(
		fullName: string,
		birthDate: string,
		imgUrl: string,
		info: string,
		deathDate?: string
	): Promise<void | never> {
		const query: string = AuthorsQueries.Create;
		const values: any[] = [fullName, birthDate, deathDate, imgUrl, info];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async delete(id: number): Promise<void | never> {
		const query: string = AuthorsQueries.Delete;
		const values: any[] = [id];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}
}

export default Author;
