import { BooklistItemsRequest } from '../../types/booklist_items_request.type';
import { Request, Response } from 'express';
import {
	isCreateBooklistItemDto,
	isUpdateBooklistItemDto,
} from '../../guards/booklist_items.guards';
import { isInteger, isString } from '../../guards/primitive_types.guards';

class BooklistItemsRequestValidator {
	public static validate(req: BooklistItemsRequest) {
		switch (req) {
			case 'booklist-items-create':
				return this.validateCreate;
			case 'booklist-items-update':
				return this.validateUpdate;
			case 'booklist-items-delete':
				return this.validateDelete;
		}
	}

	private static validateCreate(req: Request, res: Response, next: any) {
		const { userId, bookId } = req.params;
		const userIdParsed = Number(userId);
		const bookIdParsed = Number(bookId);

		if (!isInteger(userIdParsed)) res.sendStatus(400);
		if (!isInteger(bookIdParsed)) res.sendStatus(400);

		const { body } = req;
		const { statusId } = body;
		body.statusId = isString(statusId) ? Number(statusId) : statusId;

		if (!isCreateBooklistItemDto(body)) res.sendStatus(400);

		next();
	}

	private static validateUpdate(req: Request, res: Response, next: any) {
		const { userId, bookId } = req.params;
		const userIdParsed = Number(userId);
		const bookIdParsed = Number(bookId);

		if (!isInteger(userIdParsed)) res.sendStatus(400);
		if (!isInteger(bookIdParsed)) res.sendStatus(400);

		const { body } = req;
		const { statusId } = body;
		body.statusId = isString(statusId) ? Number(statusId) : statusId;

		if (!isUpdateBooklistItemDto(body)) res.sendStatus(400);

		next();
	}

	private static validateDelete(req: Request, res: Response, next: any) {
		const { userId, bookId } = req.params;
		const userIdParsed = Number(userId);
		const bookIdParsed = Number(bookId);

		if (!isInteger(userIdParsed)) res.sendStatus(400);
		if (!isInteger(bookIdParsed)) res.sendStatus(400);

		const { body } = req;
		const { statusId } = body;
		body.statusId = isString(statusId) ? Number(statusId) : statusId;

		if (!isUpdateBooklistItemDto(body)) res.sendStatus(400);

		next();
	}
}

export default BooklistItemsRequestValidator;
