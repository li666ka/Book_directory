import { Request, Response } from 'express';

import { CreateBooklistItemDto } from './dto/create-booklist-item.dto';
import { UpdateBooklistItemDto } from './dto/update-booklist-item.dto';
import { BooklistItemDto } from './dto/booklist-item.dto';

import BooklistService from '../../services/booklist.service';
import { HttpCode } from '../../exceptions/app-error';
import { parseToInt } from '../../utils/parsing.util';

class BooklistController {
	public static async create(
		req: Request<{ userId: string; bookId: string }, never, CreateBooklistItemDto>,
		res: Response
	) {
		const { userId, bookId } = req.params;
		const userIdParsed: number = parseToInt(userId),
			bookIdParsed: number = parseToInt(bookId);
		const { body } = req;

		const newBooklistItem: BooklistItemDto = await BooklistService.create(
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
		const userIdParsed: number = parseToInt(userId),
			bookIdParsed: number = parseToInt(bookId);
		const { body } = req;
		await BooklistService.update(userIdParsed, bookIdParsed, body);
		res.sendStatus(HttpCode.OK);
	}

	public static async delete(
		req: Request<{ userId: string; bookId: string }>,
		res: Response
	) {
		const { userId, bookId } = req.params;
		const userIdParsed: number = parseToInt(userId),
			bookIdParsed: number = parseToInt(bookId);
		await BooklistService.delete(userIdParsed, bookIdParsed);
		res.sendStatus(HttpCode.OK);
	}
}

export default BooklistController;
