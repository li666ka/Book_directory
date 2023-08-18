import { Request, Response } from 'express';
import {
	isUpdateUserDto,
	isUpdateUserRoleDto,
	isUserFiltersDto,
} from '../../guards/users.guards';
import { UsersRequest } from '../../types/request.types';
import { AppError, HttpCode } from '../../exceptions/app-error';

class UsersRequestValidator {
	public static validate(req: UsersRequest) {
		switch (req) {
			case 'users-get-all':
				return this.validateGetAll;
			case 'users-update':
				return this.validateUpdate;
			case 'users-update-role':
				return this.validateUpdateRole;
			default:
				return (req: Request, res: Response, next: any) => {
					next();
				};
		}
	}

	private static validateGetAll(req: Request, res: Response, next: any) {
		const { query } = req;
		if (!isUserFiltersDto(query))
			throw new AppError(HttpCode.BAD_REQUEST, 'Incorrect UserFiltersDto');

		next();
	}

	private static validateUpdate(req: Request, res: Response, next: any) {
		const { body } = req;
		if (!isUpdateUserDto(body))
			throw new AppError(HttpCode.BAD_REQUEST, 'Incorrect UpdateUserDto');

		next();
	}

	private static validateUpdateRole(req: Request, res: Response, next: any) {
		const { body } = req;
		if (!isUpdateUserRoleDto(body))
			throw new AppError(HttpCode.BAD_REQUEST, 'Incorrect UpdateUserRoleDto');

		next();
	}
}

export default UsersRequestValidator;
