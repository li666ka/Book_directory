import DB_CONNECTION from '../utils/db.connector';
import BooksGenresQueries from '../db/queries/books_genres.queries';
import { OkPacket, RowDataPacket } from 'mysql2';

export interface BookGenre extends RowDataPacket {
	book_id: number;
	genre_id: number;
}

export class BookGenreRepository {
	public static async getByBookId(id: number): Promise<BookGenre[] | never> {
		const query: string = BooksGenresQueries.GetAllByBookId;
		const values: number[] = [id];
		const [rows] = await DB_CONNECTION.promise().query<BookGenre[]>(query, values);
		return rows;
	}

	public static async create(bookId: number, genreId: number): Promise<void | never> {
		const query: string = BooksGenresQueries.Create;
		const values: number[] = [bookId, genreId];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async deleteByBookId(bookId: number): Promise<void | never> {
		const query: string = BooksGenresQueries.DeleteAllByBookId;
		const values: number[] = [bookId];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}
}

export default BookGenre;
