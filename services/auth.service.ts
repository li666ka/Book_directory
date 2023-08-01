import { OkPacket } from 'mysql2';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User, UserRepository } from '../models/user.model';
import { Role, RoleRepository } from '../models/role.model';

import { JWT_SECRET } from '../utils/jwt.util';
import AuthValidator from './validators/auth.validator';
import { Role as RoleName } from '../types/role.type';
import { CreateUserDto } from '../controllers/auth/dto/create_user.dto';
import { LoginUserDto } from '../controllers/auth/dto/login_user.dto';

class AuthService {
	public static async register(
		createUserDto: CreateUserDto,
		role: RoleName
	): Promise<string> {
		const roleId: number = await AuthValidator.validateCreating(createUserDto, role);

		const { username, password } = createUserDto;
		const hash = bcrypt.hashSync(password, 10);

		const okPacket: OkPacket = await UserRepository.create(roleId, username, hash);
		const newUser = (await UserRepository.get(okPacket.insertId)) as User;

		return jwt.sign(
			{ userId: newUser.id, username: newUser.username, role: role },
			JWT_SECRET
		);
	}

	public static async login(loginUserDto: LoginUserDto): Promise<string> {
		const user = await AuthValidator.validateLogin(loginUserDto);

		const { password } = loginUserDto;

		const isPasswordCorrect: boolean = bcrypt.compareSync(password, user.password);
		if (!isPasswordCorrect) throw new Error('Incorrect password');

		const role: string = ((await RoleRepository.get(user.role_id)) as Role).name;

		return jwt.sign(
			{ userId: user.id, username: user.username, role: role },
			JWT_SECRET
		);
	}
}

export default AuthService;
