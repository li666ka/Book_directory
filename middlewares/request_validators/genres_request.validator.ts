import { GenresRequest } from '../../types/genres_request.type';
import { Request, Response } from 'express';
import { isCreateGenreDto, isGenreFiltersDto } from '../../guards/genres_dto.guards';
import { isInteger } from '../../guards/primitive_types.guards';
import { isUpdateBookDto } from '../../guards/books_dto.guards';

class GenresRequestValidator {
	public static validate(req: GenresRequest) {
		switch (req) {
			case 'genres-get-all':
				return this.validateGetAll;
			case 'genres-get':
				return this.validateGet;
			case 'genres-create':
				return this.validateCreate;
			case 'genres-update':
				return this.validateUpdate;
			case 'genres-delete':
				return this.validateDelete;
		}
	}

	private static validateGetAll(req: Request, res: Response, next: any) {
		const { query } = req;
		if (!isGenreFiltersDto(query)) res.sendStatus(400);
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
		const { body } = req;
		if (!isCreateGenreDto(body)) res.sendStatus(400);

		next();
	}

	private static validateUpdate(req: Request, res: Response, next: any) {
		// parse `id` to number
		const { id } = req.params;
		const idParsed = Number(id);

		if (!isInteger(idParsed)) res.sendStatus(400);

		const { body } = req;
		if (!isUpdateBookDto(body)) res.sendStatus(400);

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

export default GenresRequestValidator;
