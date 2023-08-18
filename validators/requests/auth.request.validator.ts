import { Request, Response } from 'express';

import { isCreateUserDto, isLoginUserDto } from '../../guards/users_dto.guards';
import { AuthRequest } from '../../types/request.types';
import { AppError, HttpCode } from '../../exceptions/app_error';

class AuthRequestValidator {
	public static validate(
		req: AuthRequest
	): (req: Request, res: Response, next: any) => any {
		switch (req) {
			case 'auth-create-user':
				return this.validateCreateUser;
			case 'auth-create-moderator':
				return this.validateCreateModerator;
			case 'auth-create-admin':
				return this.validateCreateAdmin;
			case 'auth-login':
				return this.validateLogin;
			default:
				return (req: Request, res: Response, next: any) => {
					next();
				};
		}
	}

	private static validateCreateUser(req: Request, res: Response, next: any): any {
		const { body } = req;
		console.log(body);
		if (!isCreateUserDto(body))
			throw new AppError(HttpCode.BAD_REQUEST, 'Incorrect CreateUserDto');
		next();
	}

	private static validateCreateModerator(req: Request, res: Response, next: any) {
		const { body } = req;
		if (!isCreateUserDto(body))
			throw new AppError(HttpCode.BAD_REQUEST, 'Incorrect CreateUserDto');
		next();
	}

	private static validateCreateAdmin(req: Request, res: Response, next: any) {
		const { body } = req;
		if (!isCreateUserDto(body))
			throw new AppError(HttpCode.BAD_REQUEST, 'Incorrect CreateUserDto');
		next();
	}

	private static validateLogin(req: Request, res: Response, next: any) {
		const { body } = req;
		if (!isLoginUserDto(body))
			throw new AppError(HttpCode.BAD_REQUEST, 'Incorrect LoginUserDto');
		next();
	}
}

export default AuthRequestValidator;
