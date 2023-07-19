import { OkPacket, RowDataPacket } from 'mysql2';

import BooklistItemsQueries from '../db/queries/booklist_items.queries';
import DB_CONNECTION from '../services/db.connector';

export interface BooklistItem extends RowDataPacket {
	user_id: number;
	book_id: number;
	status_id: number;
}

export class BooklistItemRepository {
	public static async getAll(): Promise<BooklistItem[] | never> {
		const query: string = BooklistItemsQueries.GetAll;
		const [rows] = await DB_CONNECTION.promise().query<BooklistItem[]>(query);
		return rows;
	}

	public static async get(
		userId: number,
		bookId: number
	): Promise<BooklistItem | never> {
		const query: string = BooklistItemsQueries.Get;
		const values: any[] = [userId, bookId];
		const [rows] = await DB_CONNECTION.promise().query<BooklistItem[]>(query, values);
		return rows[0];
	}

	public static async create(
		userId: number,
		bookId: number,
		statusId: number
	): Promise<void | never> {
		const query: string = BooklistItemsQueries.Create;
		const values: any[] = [userId, bookId, statusId];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async update(
		n_statusId: number,
		userId: number,
		bookId: number
	): Promise<void | never> {
		const query: string = BooklistItemsQueries.Update;
		const values: any[] = [n_statusId, userId, bookId];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}

	public static async delete(userId: number, bookId: number): Promise<void | never> {
		const query: string = BooklistItemsQueries.Delete;
		const values: any[] = [userId, bookId];
		await DB_CONNECTION.promise().query<OkPacket>(query, values);
	}
}
