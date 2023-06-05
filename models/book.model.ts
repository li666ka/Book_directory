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
	public static async get(title?: string, genresIds?: number[]): Promise<Book[]> {
		let isWhereSet: boolean = false;
		let query: string = BooksQueries.GetAll;
		let values: any[] = [];

		if (title) {
			title = '%' + title + '%';
			query += ` WHERE books.title LIKE ?`;
			values.push(title);
			isWhereSet = true;
		}

		if (genresIds) {
			genresIds.map((genreId) => {
				isWhereSet ? (query += ` AND`) : (query += ` WHERE`);
				query += ` EXISTS( 
				SELECT * FROM books_genres 
				WHERE books_genres.book_id = books.id AND books_genres.genre_id = ?)`;
				values.push(genreId);
			});
		}

		const [rows] = await DB_CONNECTION.promise().query<Book[]>(query, values);

		return rows;
	}

	public static async getById(id: number): Promise<Book | never> {
		const query: string = BooksQueries.GetById;
		const values: number[] = [id];
		const [rows] = await DB_CONNECTION.promise().query<Book[]>(query, values);
		return rows[0];
	}

	public static async getByAuthorId(id: number): Promise<Book[] | never> {
		const query: string = BooksQueries.GetAllByAuthorId;
		const values: number[] = [id];
		const [rows] = await DB_CONNECTION.promise().query<Book[]>(query, values);
		return rows;
	}

	public static async getByTitleAndAuthorId(
		title: string,
		authorId: number
	): Promise<Book | undefined | never> {
		const query: string = BooksQueries.GetByTitleAndAuthorId;
		const values: any[] = [title, authorId];
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

	public static async updateTitle(id: number, title: string): Promise<void | never> {
		const query: string = BooksQueries.UpdateTitle;
		const values: any[] = [id, title];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async updateAuthorId(
		id: number,
		authorId: string
	): Promise<void | never> {
		const query: string = BooksQueries.UpdateAuthorId;
		const values: any[] = [id, authorId];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async updateDescription(
		id: number,
		description: string
	): Promise<void | never> {
		const query: string = BooksQueries.UpdateDescription;
		const values: any[] = [id, description];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async updateImgUrl(id: number, imgUrl: string): Promise<void | never> {
		const query: string = BooksQueries.UpdateImgUrl;
		const values: any[] = [id, imgUrl];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async updateUrl(id: number, url: string): Promise<void | never> {
		const query: string = BooksQueries.UpdateImgUrl;
		const values: any[] = [id, url];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async delete(id: number): Promise<void | never> {
		const query: string = BooksQueries.Delete;
		const values: any[] = [id];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}
}

export default Book;
