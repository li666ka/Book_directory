import { Request, Response } from 'express';

import { AuthorsRequest } from '../../types/authors_request.type';
import {
	isAuthorsFiltersDto,
	isCreateAuthorDto,
	isUpdateAuthorDto,
} from '../../guards/authors_dto.guards';
import { isInteger } from '../../guards/primitive_types.guards';
import { isFilesObject } from '../../guards/files.guards';

class AuthorsRequestValidator {
	public static validate(req: AuthorsRequest) {
		switch (req) {
			case 'authors-get-all':
				return this.validateGetAll;
			case 'authors-get':
				return this.validateGet;
			case 'authors-create':
				return this.validateCreate;
			case 'authors-update':
				return this.validateUpdate;
			case 'authors-delete':
				return this.validateDelete;
		}
	}

	private static validateGetAll(req: Request, res: Response, next: any) {
		const { query } = req;
		if (!isAuthorsFiltersDto(query)) res.sendStatus(400);
		next();
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
		const { genreIds } = body.book;
		body.book.genreIds = Array.isArray(genreIds)
			? genreIds.map((genreId) => Number(genreId))
			: genreIds;

		if (!isCreateAuthorDto(body)) res.sendStatus(400);

		// files
		if (!isFilesObject(files)) res.sendStatus(400);

		const bookImageFile: Express.Multer.File | undefined = files
			? files['book-image']
				? files['book-image'][0]
				: undefined
			: undefined;
		const bookFile: Express.Multer.File | undefined = files
			? files['book-file']
				? files['book-file'][0]
				: undefined
			: undefined;
		const authorImageFile: string | undefined = files
			? files['author-image']
				? files['author-image'][0].filename
				: undefined
			: undefined;

		if (!bookImageFile || !bookFile || !authorImageFile) res.sendStatus(400);

		next();
	}

	private static validateUpdate(req: Request, res: Response, next: any) {
		const { body, files } = req;
		// parse `id` to number
		const { id } = req.params;
		const idParsed = Number(id);

		if (!isInteger(idParsed)) res.sendStatus(400);
		if (!isUpdateAuthorDto(body)) res.sendStatus(400);
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

export default AuthorsRequestValidator;
