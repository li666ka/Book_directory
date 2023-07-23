import { RowDataPacket, OkPacket } from 'mysql2';

import DB_CONNECTION from '../services/db.connector';
import AuthorsQueries from '../db/queries/authors.queries';

export interface Author extends RowDataPacket {
	id: number;
	full_name: string;
	born_at: string;
	died_at: string | null;
	info: string;
	image_file: string;
	created_at: string;
}

export class AuthorRepository {
	public static async getAll(): Promise<Author[]> {
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
		diedAt: string | null,
		imageFile: string,
		info: string
	): Promise<OkPacket> {
		const query: string = AuthorsQueries.Create;
		const values: any[] = [fullName, bornAt, diedAt, info, imageFile];
		const [okPacket] = await DB_CONNECTION.promise().query<OkPacket>(query, values);
		return okPacket;
	}

	public static async update(
		newFullName: string,
		newBornAt: string,
		newDiedAt: string | null,
		newInfo: string,
		newImageFile: string,
		id: number
	): Promise<void> {
		const query: string = AuthorsQueries.Update;
		const values: any[] = [
			newFullName,
			newBornAt,
			newDiedAt,
			newInfo,
			newImageFile,
			id,
		];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async delete(id: number): Promise<void> {
		const query: string = AuthorsQueries.Delete;
		const values: any[] = [id];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}
}
