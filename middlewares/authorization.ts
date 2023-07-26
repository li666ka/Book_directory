import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { Role } from '../types/role.type';
import { JWT_SECRET, JwtPayloadExt } from '../configs/jwt.config';

export function authorize(
	accountOwner: boolean,
	...roles: Role[]
): (req: Request, res: Response, next: any) => any {
	return (req: Request, res: Response, next: any) => {
		try {
			const authHeader = req.headers.authorization;
			if (!authHeader) throw new Error('No bearer token');

			const token: string = authHeader.replace('Bearer ', '');

			const user = jwt.verify(token, JWT_SECRET) as JwtPayloadExt;

			const { role: userRole } = user;

			if (!userRole) throw new Error('RoleId is undefined');

			if (accountOwner) {
				if (user.userId === +req.params.id) return next();
			}

			for (const requireRole of roles) {
				if (userRole === requireRole.valueOf()) return next();
			}

			throw new Error('Incorrect role');
		} catch (err: unknown) {
			console.log(err.message);
			return res.sendStatus(403); // Forbidden
		}
	};
}
