import LoginUserDto from '../controllers/auth/dto/login_user.dto';
import { User, UserRepository } from '../models/user.model';
import CreateUserDto from '../controllers/auth/dto/create_user.dto';
import RoleName from '../types/role.type';
import { RoleRepository } from '../models/role.model';

import { isCreateUserDto } from '../guards/users_dto.guards';

class AuthValidator {
	public static async validateCreating(
		createUserDto: CreateUserDto | undefined,
		role: RoleName
	): Promise<number> {
		if (!isCreateUserDto(createUserDto)) throw new Error(`Incorrect dto`);

		const { username, password } = createUserDto;

		const user: User | undefined = (await UserRepository.getAll()).find(
			(user) => user.username === username
		);

		if (user) throw new Error(`User with username ${username} already exists`);

		const { id: roleId } = (await RoleRepository.getAll()).find(
			(role) => role.name === role.valueOf()
		);

		if (!roleId) throw new Error(`Role with name ${role.valueOf()} does not exist`);

		return roleId;
	}

	public static async validateLogin(
		loginUserDto: LoginUserDto | undefined
	): Promise<User> {
		if (!loginUserDto) throw new Error('dto is undefined');

		const { username, password } = loginUserDto;

		if (!username) throw new Error('username is undefined');
		if (!password) throw new Error('password is undefined');

		const user: User | undefined = (await UserRepository.getAll()).find(
			(user) => user.username === username
		);

		if (!user) throw new Error(`User with username ${username} does not exist`);

		return user;
	}
}

export default AuthValidator;
