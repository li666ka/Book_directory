import { Request, Response } from 'express';

import UsersService from '../../services/users.service';

import { parseId, parseUserFiltersDto } from '../../utils/parsing.util';
import { HttpCode } from '../../exceptions/app_error';
import { UserFiltersDto } from './dto/user_filters.dto';
import { UserDto } from './dto/user.dto';
import { UserDetailsDto } from './dto/user_details.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { UpdateUserRoleDto } from './dto/update_user_role.dto';

class UsersController {
	public static async getAll(
		req: Request<never, never, never, UserFiltersDto | undefined>,
		res: Response<UserDto[]>
	) {
		const { query } = req;
		const userFiltersParsed = query ? parseUserFiltersDto(query) : undefined;
		const users: UserDto[] = await UsersService.find(userFiltersParsed);
		res.json(users);
	}

	public static async get(
		req: Request<{ userId: string }>,
		res: Response<UserDetailsDto>
	) {
		const { userId } = req.params;
		const idParsed = parseId(userId);
		const user: UserDetailsDto = await UsersService.findOne(idParsed);
		res.json(user);
	}

	public static async update(
		req: Request<{ userId: string }, never, UpdateUserDto>,
		res: Response
	) {
		const { userId } = req.params;
		const { body } = req;

		const idParsed = parseId(userId);

		await UsersService.update(idParsed, body);
		res.sendStatus(HttpCode.OK);
	}

	public static async updateRole(
		req: Request<{ userId: string }, never, UpdateUserRoleDto>,
		res: Response
	) {
		const { userId } = req.params;
		const { body } = req;

		const idParsed = parseId(userId);
		await UsersService.updateRole(idParsed, body);
		res.sendStatus(HttpCode.OK);
	}

	public static async delete(req: Request<{ userId: string }>, res: Response) {
		const { userId } = req.params;
		const idParsed = parseId(userId);
		await UsersService.delete(idParsed);
		res.sendStatus(HttpCode.OK);
	}
}

export default UsersController;
