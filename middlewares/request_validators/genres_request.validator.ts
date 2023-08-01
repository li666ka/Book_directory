import { Request, Response } from 'express';
import {
	isCreateGenreDto,
	isGenreFiltersDto,
	isUpdateGenreDto,
} from '../../guards/genres_dto.guards';
import { GenresRequest } from '../../types/request.types';
import { AppError, HttpCode } from '../../exceptions/app_error';

class GenresRequestValidator {
	public static validate(req: GenresRequest) {
		switch (req) {
			case 'genres-get-all':
				return this.validateGetAll;
			case 'genres-create':
				return this.validateCreate;
			case 'genres-update':
				return this.validateUpdate;
			default:
				return (req: Request, res: Response, next: any) => {
					next();
				};
		}
	}

	private static validateGetAll(req: Request, res: Response, next: any) {
		const { query } = req;
		if (query) {
			if (!isGenreFiltersDto(query))
				throw new AppError(HttpCode.BAD_REQUEST, 'Incorrect GenreFiltersDto');
		}
		next();
	}

	private static validateCreate(req: Request, res: Response, next: any) {
		const { body } = req;
		if (!isCreateGenreDto(body))
			throw new AppError(HttpCode.BAD_REQUEST, 'Incorrect CreateGenreDto');

		next();
	}

	private static validateUpdate(req: Request, res: Response, next: any) {
		const { body } = req;
		if (!isUpdateGenreDto(body))
			throw new AppError(HttpCode.BAD_REQUEST, 'Incorrect UpdateGenreDto');

		next();
	}
}

export default GenresRequestValidator;
