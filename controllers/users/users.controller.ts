import { Request, Response } from 'express';

import UsersService from '../../services/users.service';

import { parseToInt, parseUserFiltersDto } from '../../utils/parsing.util';
import { HttpCode } from '../../exceptions/app-error';
import { UserFiltersDto } from './dto/user_filters.dto';
import { UserDto } from './dto/user.dto';
import { UserDetailsDto } from './dto/user_details.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { UpdateUserRoleDto } from './dto/update_user_role.dto';

class UsersController {
	public static async getAll(
		req: Request<never, never, never, UserFiltersDto>,
		res: Response<UserDto[]>
	) {
		const { query } = req;
		const userFiltersParsed = parseUserFiltersDto(query);
		const users: UserDto[] = await UsersService.find(userFiltersParsed);
		res.json(users);
	}

	public static async get(
		req: Request<{ userId: string }>,
		res: Response<UserDetailsDto>
	) {
		const { userId } = req.params;
		const idParsed = parseToInt(userId);
		const user: UserDetailsDto = await UsersService.findOne(idParsed);
		res.json(user);
	}

	public static async update(
		req: Request<{ userId: string }, never, UpdateUserDto>,
		res: Response
	) {
		const { userId } = req.params;
		const { body } = req;

		const idParsed = parseToInt(userId);

		await UsersService.update(idParsed, body);
		res.sendStatus(HttpCode.OK);
	}

	public static async updateRole(
		req: Request<{ userId: string }, never, UpdateUserRoleDto>,
		res: Response
	) {
		const { userId } = req.params;
		const { body } = req;

		const idParsed = parseToInt(userId);
		await UsersService.updateRole(idParsed, body);
		res.sendStatus(HttpCode.OK);
	}

	public static async delete(req: Request<{ userId: string }>, res: Response) {
		const { userId } = req.params;
		const idParsed = parseToInt(userId);
		await UsersService.delete(idParsed);
		res.sendStatus(HttpCode.OK);
	}
}

export default UsersController;
