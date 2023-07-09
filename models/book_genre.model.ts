import { OkPacket, RowDataPacket } from 'mysql2';

import DB_CONNECTION from '../services/db.connector';
import BooksGenresQueries from '../db/queries/books_genres.queries';

export interface BookGenre extends RowDataPacket {
	book_id: number;
	genre_id: number;
}

export class BookGenreRepository {
	public static async getAll(): Promise<BookGenre[] | never> {
		const query: string = BooksGenresQueries.GetAll;
		const [rows] = await DB_CONNECTION.promise().query<BookGenre[]>(query);
		return rows;
	}

	public static async get(
		bookId: number,
		genreId: number
	): Promise<BookGenre[] | never> {
		const query: string = BooksGenresQueries.Get;
		const values: any[] = [bookId, genreId];
		const [rows] = await DB_CONNECTION.promise().query<BookGenre[]>(query, values);
		return rows;
	}

	public static async create(bookId: number, genreId: number): Promise<void | never> {
		const query: string = BooksGenresQueries.Create;
		const values: number[] = [bookId, genreId];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async delete(bookId: number, genreId: number): Promise<void | never> {
		const query: string = BooksGenresQueries.Delete;
		const values: any[] = [bookId, genreId];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}
}
