import { OkPacket, RowDataPacket } from 'mysql2';

import DB_CONNECTION from '../utils/db.connector';
import BooksQueries from '../db/queries/books.queries';

export interface Book extends RowDataPacket {
	id: number;
	author_id: number;
	title: string;
	img_url: string;
	description: string;
	url: string;
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
		imgUrl: string,
		description: string,
		url: string
	): Promise<void | never> {
		const query: string = BooksQueries.Create;
		const values: any[] = [authorId, title, imgUrl, description, url];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async update(
		n_authorId: number,
		n_title: string,
		n_imgUrl: string,
		n_description: string,
		n_url: string,
		id: number
	): Promise<Book[] | never> {
		const query: string = BooksQueries.Update;
		const values: any[] = [n_authorId, n_title, n_imgUrl, n_description, n_url, id];
		const [rows] = await DB_CONNECTION.promise().query<Book[]>(query, values);
		return rows;
	}

	public static async delete(id: number): Promise<void | never> {
		const query: string = BooksQueries.Delete;
		const values: any[] = [id];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}
}

export default Book;
