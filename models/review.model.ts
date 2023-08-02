import { OkPacket, RowDataPacket } from 'mysql2';

import DB_CONNECTION from '../utils/db.util';
import ReviewsQueries from '../db/queries/reviews.queries';

export interface Review extends RowDataPacket {
	user_id: number;
	book_id: number;
	score: number;
	comment: string | null;
	created_at: string;
}

export class ReviewRepository {
	public static async getAll(): Promise<Review[]> {
		const query: string = ReviewsQueries.GetAll;
		const [rows] = await DB_CONNECTION.promise().query<Review[]>(query);
		return rows;
	}

	public static async get(userId: number, bookId: number): Promise<Review | undefined> {
		const query: string = ReviewsQueries.Get;
		const values: any[] = [userId, bookId];
		const [rows] = await DB_CONNECTION.promise().query<Review[]>(query, values);
		return rows[0];
	}

	public static async create(
		userId: number,
		bookId: number,
		score: number,
		comment: string | null
	): Promise<OkPacket> {
		const query: string = ReviewsQueries.Create;
		const values: any[] = [userId, bookId, score, comment];
		const [okPacket] = await DB_CONNECTION.promise().query<OkPacket>(query, values);
		return okPacket;
	}

	public static async update(
		newScore: number,
		newComment: string | null,
		userId: number,
		bookId: number
	): Promise<void> {
		const query: string = ReviewsQueries.Update;
		const values: any[] = [newScore, newComment, userId, bookId];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async delete(userId: number, bookId: number): Promise<void> {
		const query: string = ReviewsQueries.Delete;
		const values: any[] = [userId, bookId];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}
}
