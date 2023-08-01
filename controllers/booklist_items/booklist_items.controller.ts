import { Request, Response } from 'express';

import { CreateBooklistItemDto } from './dto/create_booklist_item.dto';
import { UpdateBooklistItemDto } from './dto/update_booklist_item.dto';
import { BooklistItemDto } from './dto/booklist_item.dto';

import BooklistItemsService from '../../services/booklist_items.service';
import { HttpCode } from '../../exceptions/app_error';
import { parseId } from '../../utils/parsing.util';

class BooklistItemsController {
	public static async create(
		req: Request<{ userId: string; bookId: string }, never, CreateBooklistItemDto>,
		res: Response
	) {
		const { userId, bookId } = req.params;
		const userIdParsed: number = parseId(userId),
			bookIdParsed: number = parseId(bookId);
		const { body } = req;

		const newBooklistItem: BooklistItemDto = await BooklistItemsService.create(
			userIdParsed,
			bookIdParsed,
			body
		);

		res.status(HttpCode.CREATED).json(newBooklistItem);
	}

	public static async update(
		req: Request<{ userId: string; bookId: string }, never, UpdateBooklistItemDto>,
		res: Response
	) {
		const { userId, bookId } = req.params;
		const userIdParsed: number = parseId(userId),
			bookIdParsed: number = parseId(bookId);
		const { body } = req;
		await BooklistItemsService.update(userIdParsed, bookIdParsed, body);
		res.sendStatus(HttpCode.OK);
	}

	public static async delete(
		req: Request<{ userId: string; bookId: string }>,
		res: Response
	) {
		const { userId, bookId } = req.params;
		const userIdParsed: number = parseId(userId),
			bookIdParsed: number = parseId(bookId);
		await BooklistItemsService.delete(userIdParsed, bookIdParsed);
		res.sendStatus(HttpCode.OK);
	}
}

export default BooklistItemsController;
