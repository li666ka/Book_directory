import { Request, Response } from 'express';

import { isCreateUserDto, isLoginUserDto } from '../../guards/users_dto.guards';
import { AuthRequest } from '../../types/auth_request.type';

class AuthRequestValidator {
	public static validate(req: AuthRequest) {
		switch (req) {
			case 'auth-create-user':
				return this.validateCreateUser;
			case 'auth-create-moderator':
				return this.validateCreateModerator;
			case 'auth-create-admin':
				return this.validateCreateAdmin;
			case 'auth-login':
				return this.validateLogin;
		}
	}

	private static validateCreateUser(req: Request, res: Response, next: any) {
		if (!isCreateUserDto(req.body)) res.sendStatus(400);
		next();
	}

	private static validateCreateModerator(req: Request, res: Response, next: any) {
		if (!isCreateUserDto(req.body)) res.sendStatus(400);
		next();
	}

	private static validateCreateAdmin(req: Request, res: Response, next: any) {
		if (!isCreateUserDto(req.body)) res.sendStatus(400);
		next();
	}

	private static validateLogin(req: Request, res: Response, next: any) {
		if (!isLoginUserDto(req.body)) res.sendStatus(400);
		next();
	}
}

export default AuthRequestValidator;
