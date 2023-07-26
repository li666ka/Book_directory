import { Request, Response } from 'express';
import CreateBooklistItemDto from './dto/create_booklist_item.dto';
import UpdateBooklistItemDto from './dto/update_booklist_item.dto';

class BooklistItemsController {
	public static async create(
		req: Request<{ userId: string; bookId: string }, never, CreateBooklistItemDto>,
		res: Response
	): Promise<void> {
		try {
		} catch (err: unknown) {
			res.sendStatus(400);
		}
	}

	public static async update(
		req: Request<{ userId: string; bookId: string }, never, UpdateBooklistItemDto>,
		res: Response
	): Promise<void> {
		try {
		} catch (err: unknown) {
			res.sendStatus(400);
		}
	}

	public static async delete(
		req: Request<{ userId: string; bookId: string }>,
		res: Response
	): Promise<void> {
		try {
		} catch (err: unknown) {
			res.sendStatus(400);
		}
	}
}

export default BooklistItemsController;
