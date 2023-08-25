import { User, UserRepository } from '../../models/user.model';
import { RoleRepository } from '../../models/role.model';

import { CreateUserDto } from '../../controllers/auth/dto/create-user.dto';
import { LoginUserDto } from '../../controllers/auth/dto/login-user.dto';

import { Role as RoleName } from '../../types/role.type';
import { AppError, HttpCode } from '../../exceptions/app-error';

class AuthDataValidator {
	/**
	 * Validates data in CreateUserDto object and Role.
	 * @param createUserDto
	 * @param role
	 * Returns role id of input Role.
	 */
	public static validateCreating(createUserDto: CreateUserDto, role: RoleName): number {
		const { username } = createUserDto;

		const userSameUsername: User | undefined = UserRepository.cache.find(
			(user) => user.username === username
		);

		if (userSameUsername)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`User with username ${username} already exists`
			);

		const roleId: number | undefined = RoleRepository.cache.find(
			(r) => r.name === role
		)?.id;

		if (!roleId)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Role with name ${role} does not exist`
			);

		return roleId;
	}

	/**
	 * Validates data in LoginUserDto object.
	 * @param loginUserDto
	 * Returns User by username.
	 */
	public static validateLogin(loginUserDto: LoginUserDto): User {
		const { username } = loginUserDto;

		const user: User | undefined = UserRepository.cache.find(
			(user) => user.username === username
		);

		if (!user)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`User with username ${username} does not exist`
			);

		return user;
	}
}

export default AuthDataValidator;
