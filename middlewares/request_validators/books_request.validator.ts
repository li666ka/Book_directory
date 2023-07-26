import { BooksRequest } from '../../types/books_request.type';
import { Request, Response } from 'express';
import {
	isBookFiltersDto,
	isCreateBookDto,
	isUpdateBookDto,
} from '../../guards/books_dto.guards';
import { isInteger, isString } from '../../guards/primitive_types.guards';
import { isFilesObject } from '../../guards/files.guards';

class BooksRequestValidator {
	public static validate(req: BooksRequest) {
		switch (req) {
			case 'books-get-all':
				return this.validateGetAll;
			case 'books-get':
				return this.validateGet;
			case 'books-create':
				return this.validateCreate;
			case 'books-update':
				return this.validateUpdate;
			case 'books-delete':
				return this.validateDelete;
		}
	}

	private static validateGetAll(req: Request, res: Response, next: any) {
		const { query } = req;
		if (!isBookFiltersDto(query)) res.sendStatus(400);
	}

	private static validateGet(req: Request, res: Response, next: any) {
		// parse `id` to number
		const { id } = req.params;
		const idParsed = Number(id);

		if (!isInteger(idParsed)) res.sendStatus(400);

		next();
	}

	private static validateCreate(req: Request, res: Response, next: any) {
		const { body, files } = req;

		// body
		// parse `genreIds` to number[]
		const { genreIds } = body;
		body.genreIds = Array.isArray(genreIds)
			? genreIds.map((genreId) => Number(genreId))
			: genreIds;

		if (!isCreateBookDto(body)) res.sendStatus(400);
		if (!isFilesObject(files)) res.sendStatus(400);

		next();
	}

	private static validateUpdate(req: Request, res: Response, next: any) {
		const { body, files } = req;

		// parse `id` to number
		const { id } = req.params;
		const idParsed = Number(id);

		if (!isInteger(idParsed)) res.sendStatus(400);

		// body
		// parse `authorId` to number, `genreIds` to number[]
		const { authorId, genreIds } = body;
		body.authorId = isString(authorId) ? Number(authorId) : authorId;
		body.genreIds =
			Array.isArray(genreIds) && genreIds.every(isString)
				? genreIds.map((genreId) => Number(genreId))
				: genreIds;

		if (!isUpdateBookDto(body)) res.sendStatus(400);
		if (!isFilesObject(files)) res.sendStatus(400);

		next();
	}

	private static validateDelete(req: Request, res: Response, next: any) {
		// parse `id` to number
		const { id } = req.params;
		const idParsed = Number(id);

		if (!isInteger(idParsed)) res.sendStatus(400);

		next();
	}
}

export default BooksRequestValidator;
