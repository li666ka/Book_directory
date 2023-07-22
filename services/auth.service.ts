import { OkPacket } from 'mysql2';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import CreateUserDto from '../controllers/auth/dto/create_user.dto';
import LoginUserDto from '../controllers/auth/dto/login_user.dto';
import { JWT_SECRET } from './jwt';
import { UserRepository } from '../models/user.model';
import { Role, RoleRepository } from '../models/role.model';
import AuthValidator from '../validators/auth.validator';
import RoleName from '../configs/roles.config';

class AuthService {
	public static async register(
		createUserDto: CreateUserDto | never,
		role: RoleName
	): Promise<string | never> {
		const roleId: number = await AuthValidator.validateCreating(createUserDto, role);

		createUserDto = createUserDto as CreateUserDto;

		const { username, password } = createUserDto;
		const hash = bcrypt.hashSync(password, 10);

		const okPacket: OkPacket = await UserRepository.create(roleId, username, hash);
		const newUser = await UserRepository.get(okPacket.insertId);

		return jwt.sign(
			{ userId: newUser.id, username: newUser.username, role: role.valueOf() },
			JWT_SECRET
		);
	}

	public static async login(
		loginUserDto: LoginUserDto | undefined
	): Promise<string | never> {
		const user = await AuthValidator.validateLogin(loginUserDto);

		loginUserDto = loginUserDto as LoginUserDto;

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
