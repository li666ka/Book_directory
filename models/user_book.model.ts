import { OkPacket, RowDataPacket } from 'mysql2';

import UsersBooksQueries from '../db/queries/users_books.queries';
import DB_CONNECTION from '../utils/db.connector';

export interface UserBook extends RowDataPacket {
	user_id: number;
	book_id: number;
	status_id: number;
}

export class UserBookRepository {
	public static async getAll(): Promise<UserBook[] | never> {
		const query: string = UsersBooksQueries.GetAll;
		const [rows] = await DB_CONNECTION.promise().query<UserBook[]>(query);
		return rows;
	}

	public static async get(userId: number, bookId: number): Promise<UserBook | never> {
		const query: string = UsersBooksQueries.Get;
		const values: any[] = [userId, bookId];
		const [rows] = await DB_CONNECTION.promise().query<UserBook[]>(query, values);
		return rows[0];
	}

	public static async create(
		userId: number,
		bookId: number,
		statusId: number
	): Promise<void | never> {
		const query: string = UsersBooksQueries.Create;
		const values: any[] = [userId, bookId, statusId];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async update(
		n_statusId: number,
		userId: number,
		bookId: number
	): Promise<void | never> {
		const query: string = UsersBooksQueries.Update;
		const values: any[] = [n_statusId, userId, bookId];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async delete(userId: number, bookId: number): Promise<void | never> {
		const query: string = UsersBooksQueries.Delete;
		const values: any[] = [userId, bookId];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}
}
