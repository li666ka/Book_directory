import { Request, Response } from 'express';
import UserDto from './dto/user.dto';
import UserDetailsDto from './dto/user_details.dto';
import UserFiltersDto from './dto/user_filters.dto';
import CreateUserDto from '../auth/dto/create_user.dto';
import UsersService from '../../services/users.service';
import { Jwt } from 'jsonwebtoken';
import UpdateUserRoleDto from './dto/update_user_role.dto';

class UsersController {
	public static async getAll(
		req: Request<never, never, never, UserFiltersDto>,
		res: Response<UserDto[]>
	): Promise<void> {
		try {
			console.log(req.query);
			const users: UserDto[] = await UsersService.find(req.query);
			res.json(users);
		} catch (err: unknown) {
			console.log(err.message);
			res.sendStatus(400);
		}
		return;
	}

	public static async get(
		req: Request<{ id: string }>,
		res: Response<UserDetailsDto>
	): Promise<void> {
		try {
			const user: UserDetailsDto = await UsersService.findOne(req.params.id);
			res.json(user);
		} catch (err: unknown) {
			console.log(err.message);
			res.sendStatus(400);
		}
		return;
	}

	public static async update(
		req: Request<{ id: string }, never, UpdateUserDto>,
		res: Response<UserDetailsDto>
	): Promise<void> {
		try {
			const user: UserDetailsDto = await UsersService.update(
				req.params.id,
				req.body
			);
			res.json(user);
		} catch (err: unknown) {
			console.log(err.message);
			res.sendStatus(400);
		}
		return;
	}

	public static async updateRole(
		req: Request<{ id: string }, never, UpdateUserRoleDto>,
		res: Response<UserDetailsDto>
	): Promise<void> {
		try {
			const user: UserDetailsDto = await UsersService.updateRole(
				req.params.id,
				req.body
			);
			res.json(user);
		} catch (err: unknown) {
			console.log(err.message);
			res.sendStatus(400);
		}
		return;
	}

	public static async delete(
		req: Request<{ id: string }, never, UpdateUserRoleDto>,
		res: Response<UserDetailsDto>
	): Promise<void> {}
}

export default UsersController;
