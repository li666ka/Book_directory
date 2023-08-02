import { Request, Response } from 'express';

import {
	isAuthorsFiltersDto,
	isCreateAuthorDto,
	isUpdateAuthorDto,
} from '../../guards/authors_dto.guards';
import { isFile } from '../../guards/files.guards';
import { AuthorsRequest } from '../../types/request.types';
import { AppError, HttpCode } from '../../exceptions/app_error';

class AuthorsRequestValidator {
	public static validate(req: AuthorsRequest) {
		switch (req) {
			case 'authors-get-all':
				return this.validateGetAll;
			case 'authors-create':
				return this.validateCreate;
			case 'authors-upload-image':
				return this.validateUploadImage;
			case 'authors-update':
				return this.validateUpdate;
			default:
				return (req: Request, res: Response, next: any) => {
					next();
				};
		}
	}

	private static validateGetAll(req: Request, res: Response, next: any) {
		const { query } = req;
		if (!isAuthorsFiltersDto(query))
			throw new AppError(HttpCode.BAD_REQUEST, 'Incorrect AuthorsFiltersDto');
		next();
	}

	private static validateCreate(req: Request, res: Response, next: any) {
		const { body } = req;
		if (!isCreateAuthorDto(body))
			throw new AppError(HttpCode.BAD_REQUEST, 'Incorrect CreateAuthorDto');
		next();
	}

	private static validateUploadImage(req: Request, res: Response, next: any) {
		const { file } = req;
		if (!isFile(file)) throw new AppError(HttpCode.BAD_REQUEST, 'No author image');
		next();
	}

	private static validateUpdate(req: Request, res: Response, next: any) {
		const { body } = req;
		if (!isUpdateAuthorDto(body))
			throw new AppError(HttpCode.BAD_REQUEST, 'Incorrect UpdateAuthorDto');
		next();
	}
}

export default AuthorsRequestValidator;
