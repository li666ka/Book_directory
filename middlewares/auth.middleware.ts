import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import RoleName from '../configs/roles.config';
import { JWT_SECRET, JwtPayloadExt } from '../services/jwt';

class AuthMiddleware {
	public static require(
		accountOwner: boolean,
		...roles: RoleName[]
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
	/* Authorization */
	// public static async requireAdmin(req: Request, res: Response, next: any) {
	// 	const user = this.verify(req.headers.authorization);
	//
	// 	const { getPermission } = req.body.user;
	// 	if (getPermission) next();
	//
	// 	const roleId: number | undefined = user.roleId;
	//
	// 	try {
	// 		await this.validateRoleId(roleId, [Roles.Admin]);
	// 	} catch (err) {
	// 		return res.sendStatus(401); // Unauthorized
	// 	}
	//
	// 	return next();
	// }
	//
	// public static async requireAdminOrModerator(req: Request, res: Response, next: any) {
	// 	const user = this.verify(req.headers.authorization);
	// 	const roleId: number | undefined = user.roleId;
	//
	// 	try {
	// 		await this.validateRoleId(roleId, [Roles.Admin, Roles.Moderator]);
	// 	} catch (err) {
	// 		return res.sendStatus(401); // Unauthorized
	// 	}
	//
	// 	return next();
	// }
	//
	// private static verify(authHeader: string | undefined): JwtPayloadExt {
	// 	if (!authHeader) throw new Error('No bearer token');
	// 	const token: string = authHeader.replace('Bearer ', '');
	// 	return jwt.verify(token, JWT_SECRET) as JwtPayloadExt;
	// }
	//
	// private static async validateRoleId(
	// 	roleId: number | undefined,
	// 	requireRoles: Roles[]
	// ): Promise<void | never> {}
}

export default AuthMiddleware;
