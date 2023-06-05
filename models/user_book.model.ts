import { OkPacket, RowDataPacket } from 'mysql2';
import UsersBooksQueries from '../db/queries/users_books.queries';
import DB_CONNECTION from '../utils/db.connector';

export interface UserBook extends RowDataPacket {
	user_id: number;
	book_id: number;
	status_id: number;
}

export class UserBookRepository {
	public static async getByUserId(id: number): Promise<UserBook[] | never> {
		const query: string = UsersBooksQueries.GetByUserId;
		const values: any[] = [id];

		const [rows] = await DB_CONNECTION.promise().query<UserBook[]>(query, values);
		return rows;
	}

	public static async getByUserIdAndByBookId(
		userId: number,
		bookId: number
	): Promise<UserBook | never> {
		const query: string = UsersBooksQueries.GetByUserIdAndBookId;
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

	public static async updateStatus(
		statusId: number,
		userId: number,
		bookId: number
	): Promise<void | never> {
		const query: string = UsersBooksQueries.UpdateStatus;
		const values: any[] = [statusId, userId, bookId];

		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async delete(userId: number, bookId: number): Promise<void | never> {
		const query: string = UsersBooksQueries.Delete;
		const values: any[] = [userId, bookId];

		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}
}

export default UserBook;
