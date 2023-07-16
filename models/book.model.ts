import { OkPacket, RowDataPacket } from 'mysql2';

import DB_CONNECTION from '../services/db.connector';
import BooksQueries from '../db/queries/books.queries';

export interface Book extends RowDataPacket {
	id: number;
	author_id: number;
	title: string;
	description: string;
	image_file: string;
	book_file: string;
	created_at: string;
}

export class BookRepository {
	public static async getAll(): Promise<Book[]> {
		let query: string = BooksQueries.GetAll;
		const [rows] = await DB_CONNECTION.promise().query<Book[]>(query);
		return rows;
	}

	public static async get(id: number): Promise<Book | never> {
		const query: string = BooksQueries.Get;
		const values: any[] = [id];
		const [rows] = await DB_CONNECTION.promise().query<Book[]>(query, values);
		return rows[0];
	}

	public static async create(
		authorId: number,
		title: string,
		description: string,
		imageFile: string,
		bookFile: string
	): Promise<OkPacket | never> {
		const query: string = BooksQueries.Create;
		const values: any[] = [authorId, title, description, imageFile, bookFile];
		const res = await DB_CONNECTION.promise().query<OkPacket>(query, values);
		return res[0];
	}

	public static async update(
		newAuthorId: number,
		newTitle: string,
		newDescription: string,
		newImageFile: string,
		newBookFile: string,
		id: number
	): Promise<OkPacket | never> {
		const query: string = BooksQueries.Update;
		const values: any[] = [
			newAuthorId,
			newTitle,
			newDescription,
			newImageFile,
			newBookFile,
			id,
		];
		const res = await DB_CONNECTION.promise().query<OkPacket>(query, values);
		return res[0];
	}

	public static async delete(id: number): Promise<void | never> {
		const query: string = BooksQueries.Delete;
		const values: any[] = [id];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}
}
