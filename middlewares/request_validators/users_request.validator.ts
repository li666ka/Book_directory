import { UsersRequest } from '../../types/users_request.type';
import { Request, Response } from 'express';
import {
	isUpdateUserDto,
	isUpdateUserRoleDto,
	isUserFiltersDto,
} from '../../guards/users_dto.guards';
import { isInteger } from '../../guards/primitive_types.guards';

class UsersRequestValidator {
	public static validate(req: UsersRequest) {
		switch (req) {
			case 'users-get-all':
				return this.validateGetAll;
			case 'users-get':
				return this.validateGet;
			case 'users-update':
				return this.validateUpdate;
			case 'users-update-role':
				return this.validateUpdateRole;
			case 'users-delete':
				return this.validateDelete;
		}
	}

	private static validateGetAll(req: Request, res: Response, next: any) {
		// parse `roleIds` to number[] if this property exists
		const { roleIds } = req.body;
		req.body.roleIds = Array.isArray(roleIds)
			? roleIds.map((roleId) => parseInt(roleId as string, 10))
			: roleIds;

		if (!isUserFiltersDto(req.body)) res.sendStatus(400);

		next();
	}

	private static validateGet(req: Request, res: Response, next: any) {
		// parse `id` to number
		const { id } = req.params;
		const idParsed = Number(id);

		if (!isInteger(idParsed)) res.sendStatus(400);

		next();
	}

	private static validateUpdate(req: Request, res: Response, next: any) {
		// parse `id` to number
		const { id } = req.params;
		const idParsed = Number(id);

		if (!isInteger(idParsed) || !isUpdateUserDto(req.body)) res.sendStatus(400);
		next();
	}

	private static validateUpdateRole(req: Request, res: Response, next: any) {
		// parse `id` to number
		const { id } = req.params;
		const idParsed = Number(id);

		if (!isInteger(idParsed) || !isUpdateUserRoleDto(req.body)) res.sendStatus(400);
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

export default UsersRequestValidator;
