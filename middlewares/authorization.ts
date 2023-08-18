import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { Role } from '../types/role.type';
import { JWT_SECRET, JwtPayloadExt } from '../utils/jwt.util';
import { isString } from '../guards/_base.guards';
import { AppError, HttpCode } from '../exceptions/app-error';

export function authorize(
	accountOwner: boolean,
	...roles: Role[]
): (req: Request, res: Response, next: any) => any {
	return (req: Request, res: Response, next: any) => {
		const authHeader = req.headers.authorization;
		if (!authHeader) throw new AppError(HttpCode.UNAUTHORIZED, 'No bearer token');

		const token: string = authHeader.replace('Bearer ', '');
		const decoded = jwt.verify(token, JWT_SECRET);
		if (isString(decoded)) throw new AppError(HttpCode.FORBIDDEN, 'Incorrect token');

		const user = decoded as JwtPayloadExt;
		const { role: userRole } = user;

		if (!userRole) throw new AppError(HttpCode.FORBIDDEN, 'RoleId is undefined');

		if (accountOwner) {
			if (user.userId === +req.params.userId) return next();
		}

		for (const requireRole of roles) {
			if (userRole === requireRole.valueOf()) return next();
		}

		throw new AppError(HttpCode.FORBIDDEN, 'Incorrect role');
	};
}
