import LoginUserDto from '../../controllers/auth/dto/login_user.dto';
import { User, UserRepository } from '../../models/user.model';
import CreateUserDto from '../../controllers/auth/dto/create_user.dto';
import { Role as RoleName } from '../../types/role.type';
import { RoleRepository } from '../../models/role.model';

class AuthValidator {
	/**
	 * Validates data in CreateUserDto object and Role.
	 * @param createUserDto
	 * @param role
	 * Returns role id of input Role.
	 */
	public static async validateCreating(
		createUserDto: CreateUserDto,
		role: RoleName
	): Promise<number> {
		const { username } = createUserDto;

		const userSame: User | undefined = (await UserRepository.getAll()).find(
			(user) => user.username === username
		);

		if (userSame) throw new Error(`User with username ${username} already exists`);

		const roleId = (await RoleRepository.getAll()).find((r) => r.name === role).id;

		if (!roleId) throw new Error(`Role with name ${role} does not exist`);

		return roleId;
	}

	/**
	 * Validates data in LoginUserDto object.
	 * @param loginUserDto
	 * Returns User by username.
	 */
	public static async validateLogin(loginUserDto: LoginUserDto): Promise<User> {
		const { username } = loginUserDto;

		const user: User | undefined = (await UserRepository.getAll()).find(
			(user) => user.username === username
		);

		if (!user) throw new Error(`User with username ${username} does not exist`);

		return user;
	}
}

export default AuthValidator;
