import { OkPacket, RowDataPacket } from 'mysql2';
import DB_CONNECTION from '../utils/db.connector';
import BooksReviewsQueries from '../db/queries/reviews.queries';

export interface BookReview extends RowDataPacket {
	user_id: number;
	book_id: number;
	score: number;
	comment: string;
	created_at: string;
}

export class BookReviewRepository {
	public static async getByBookId(id: number): Promise<BookReview[] | never> {
		const query: string = BooksReviewsQueries.GetByBookId;
		const values: any[] = [id];
		const [rows] = await DB_CONNECTION.promise().query<BookReview[]>(query, values);
		return rows;
	}

	public static async getByBookIdAndUserId(
		bookId: number,
		userId: number
	): Promise<BookReview | never> {
		const query: string = BooksReviewsQueries.GetByBookId;
		const values: any[] = [bookId, userId];
		const [rows] = await DB_CONNECTION.promise().query<BookReview[]>(query, values);
		return rows[0];
	}

	public static async create(
		userId: number,
		bookId: number,
		score: number,
		text?: string
	): Promise<void | never> {
		const query: string = BooksReviewsQueries.Create;
		const values: any[] = [userId, bookId, score, text];

		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async updateScore(
		userId: number,
		bookId: number,
		score: number
	): Promise<void | never> {
		const query: string = BooksReviewsQueries.UpdateScore;
		const values: any[] = [score, userId, bookId];

		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async updateComment(
		userId: number,
		bookId: number,
		comment: string
	): Promise<void | never> {
		const query: string = BooksReviewsQueries.UpdateComment;
		const values: any[] = [comment, userId, bookId];

		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async delete(userId: number, bookId: number): Promise<void | never> {
		const query: string = BooksReviewsQueries.Delete;
		const values: any[] = [userId, bookId];

		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}
}

export default BookReview;
