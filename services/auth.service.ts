import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { JWT_SECRET, JwtPayloadExt } from './jwt';
import { Roles } from '../models/role.model';

class AuthService {
	/*
	 * Authentication
	 */

	/* Authorization */

	public static async verify(req: Request, res: Response, next: any) {
		const token: string | undefined = req.headers.authorization?.replace(
			'Bearer ',
			''
		);

		if (!token) {
			return res.sendStatus(400); // Bad Request
		}

		try {
			req.body.user = jwt.verify(token, JWT_SECRET) as JwtPayloadExt;
			return next();
		} catch (err) {
			return res.sendStatus(401); // Unauthorized
		}
	}

	public static async requireAdmin(req: Request, res: Response, next: any) {
		const roleId: number | undefined = req.body.user.role_id;

		try {
			await this.validateRoleId(roleId, [Roles.Admin]);
		} catch (err) {
			return res.sendStatus(401); // Unauthorized
		}

		return next();
	}

	public static async requireAdminOrModerator(req: Request, res: Response, next: any) {
		const roleId: number | undefined = req.body.user.role_id;

		try {
			await this.validateRoleId(roleId, [Roles.Admin, Roles.Moderator]);
		} catch (err) {
			return res.sendStatus(401); // Unauthorized
		}

		return next();
	}

	private static async validateRoleId(
		roleId: number | undefined,
		requireRoles: Roles[]
	): Promise<void | never> {
		if (!roleId) throw new Error('RoleId is undefined');

		for (let i = 0; i < requireRoles.length; ++i) {
			if (roleId === requireRoles[i].valueOf()) {
				return;
			}
		}

		throw new Error('Incorrect role');
	}
}

export default AuthService;
