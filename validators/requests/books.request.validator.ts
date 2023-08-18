import { Request, Response } from 'express';

import {
	isBookFiltersDto,
	isCreateBookDto,
	isUpdateBookDto,
} from '../../guards/books.guards';
import { BooksRequest } from '../../types/request.types';
import { AppError, HttpCode } from '../../exceptions/app-error';
import { isFile } from '../../guards/files.guards';

class BooksRequestValidator {
	public static validate(req: BooksRequest) {
		switch (req) {
			case 'books-get-all':
				return this.validateGetAll;
			case 'books-create':
				return this.validateCreate;
			case 'books-update':
				return this.validateUpdate;
			case 'books-upload-image':
				return this.validateUploadImage;
			case 'books-upload-file':
				return this.validateUploadFile;
			default:
				return (req: Request, res: Response, next: any) => {
					next();
				};
		}
	}

	private static validateGetAll(req: Request, res: Response, next: any) {
		const { query } = req;
		if (!isBookFiltersDto(query))
			throw new AppError(HttpCode.BAD_REQUEST, 'Incorrect BookFiltersDto');

		next();
	}

	private static validateCreate(req: Request, res: Response, next: any) {
		const { body } = req;
		if (!isCreateBookDto(body))
			throw new AppError(HttpCode.BAD_REQUEST, 'Incorrect CreateBookDto');
		next();
	}

	private static validateUploadImage(req: Request, res: Response, next: any) {
		const { file } = req;
		if (!isFile(file)) throw new AppError(HttpCode.BAD_REQUEST, 'No image file');
		next();
	}

	private static validateUploadFile(req: Request, res: Response, next: any) {
		const { file } = req;
		if (!isFile(file)) throw new AppError(HttpCode.BAD_REQUEST, 'No book file');
		next();
	}

	private static validateUpdate(req: Request, res: Response, next: any) {
		const { body } = req;
		if (!isUpdateBookDto(body))
			throw new AppError(HttpCode.BAD_REQUEST, 'Incorrect UpdateBookDto');
		next();
	}
}

export default BooksRequestValidator;
