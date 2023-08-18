import { Request, Response } from 'express';

import AuthService from '../../services/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

class AuthController {
	public static async createUser(
		req: Request<never, never, CreateUserDto>,
		res: Response<string>
	) {
		const { body } = req;
		const token: string = await AuthService.register(body, 'user');
		res.json(token);
	}

	public static async createModerator(
		req: Request<never, never, CreateUserDto>,
		res: Response<string>
	) {
		const { body } = req;
		const token: string = await AuthService.register(body, 'moderator');
		res.json(token);
	}

	public static async createAdmin(
		req: Request<never, never, CreateUserDto>,
		res: Response<string>
	) {
		const { body } = req;
		const token: string = await AuthService.register(body, 'admin');
		res.json(token);
	}

	public static async login(
		req: Request<never, never, LoginUserDto>,
		res: Response<string>
	) {
		const { body } = req;
		console.log(body);
		const token: string = await AuthService.login(body);
		res.json(token);
	}
}

export default AuthController;
