import { OkPacket, RowDataPacket } from 'mysql2';

import { DB_CONNECTION } from '../utils/db.util';
import BooksGenresQueries from '../db/queries/books-genres.queries';

export interface BookGenre extends RowDataPacket {
	book_id: number;
	genre_id: number;
}

export class BookGenreRepository {
	private static _cache: BookGenre[];

	public static async store() {
		this._cache = await this.getAll();
	}

	public static get cache() {
		return this._cache;
	}

	public static async getAll(): Promise<BookGenre[]> {
		const query: string = BooksGenresQueries.GetAll;
		const [rows] = await DB_CONNECTION.promise().query<BookGenre[]>(query);
		return rows;
	}

	public static async get(
		bookId: number,
		genreId: number
	): Promise<BookGenre | undefined> {
		const query: string = BooksGenresQueries.Get;
		const values: any[] = [bookId, genreId];
		const [rows] = await DB_CONNECTION.promise().query<BookGenre[]>(query, values);
		return rows[0];
	}

	public static async create(bookId: number, genreId: number): Promise<OkPacket> {
		const query: string = BooksGenresQueries.Create;
		const values: number[] = [bookId, genreId];
		const [okPacket] = await DB_CONNECTION.promise().query<OkPacket>(query, values);
		return okPacket;
	}

	public static async delete(bookId: number, genreId: number): Promise<void> {
		const query: string = BooksGenresQueries.Delete;
		const values: any[] = [bookId, genreId];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}
}
