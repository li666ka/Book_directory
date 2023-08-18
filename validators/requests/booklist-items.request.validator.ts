import { Request, Response } from 'express';
import {
	isCreateBooklistItemDto,
	isUpdateBooklistItemDto,
} from '../../guards/booklist_items.guards';
import { BooklistItemsRequest } from '../../types/request.types';
import { AppError, HttpCode } from '../../exceptions/app_error';

class BooklistItemsRequestValidator {
	public static validate(req: BooklistItemsRequest) {
		switch (req) {
			case 'booklist-items-create':
				return this.validateCreate;
			case 'booklist-items-update':
				return this.validateUpdate;
			default:
				return (req: Request, res: Response, next: any) => {
					next();
				};
		}
	}

	private static validateCreate(req: Request, res: Response, next: any) {
		const { body } = req;
		if (!isCreateBooklistItemDto(body))
			throw new AppError(HttpCode.BAD_REQUEST, 'Incorrect CreateBooklistItemDto');

		next();
	}

	private static validateUpdate(req: Request, res: Response, next: any) {
		const { body } = req;
		if (!isUpdateBooklistItemDto(body))
			throw new AppError(HttpCode.BAD_REQUEST, 'Incorrect UpdateBooklistItemDto');

		next();
	}
}

export default BooklistItemsRequestValidator;
