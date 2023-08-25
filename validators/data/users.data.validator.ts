import { Role, RoleRepository } from '../../models/role.model';
import { User, UserRepository } from '../../models/user.model';
import { UserFiltersDtoParsed } from '../../types/dto-parsed.types';
import { UpdateUserDto } from '../../controllers/users/dto/update-user.dto';
import { UpdateUserRoleDto } from '../../controllers/users/dto/update-user-role.dto';
import { AppError, HttpCode } from '../../exceptions/app-error';
import UsersService from '../../services/users.service';

class UsersDataValidator {
	/**
	 * Validates UserFiltersDto object.
	 * Changes UserFiltersDto object (parse roleIds to number[]).
	 * @param userFiltersDto
	 */
	public static validateGettingAll(userFiltersDto: UserFiltersDtoParsed) {
		if (!userFiltersDto) return;

		const { roleIds } = userFiltersDto;

		if (roleIds) {
			for (const roleId of roleIds) {
				const role: Role | undefined = RoleRepository.cache.find(
					(role) => role.id === roleId
				);

				if (!role)
					throw new AppError(
						HttpCode.BAD_REQUEST,
						`Role with is ${roleId} does not exist`
					);
			}
			userFiltersDto.roleIds = roleIds;
		}
	}

	public static validateGetting(id: number): User {
		const user: User | undefined = UsersService.getById(id);
		if (!user)
			throw new AppError(HttpCode.BAD_REQUEST, `User with id ${id} does not exist`);

		return user;
	}

	public static validateUpdating(id: number, updateUserDto: UpdateUserDto): User {
		const user: User | undefined = UsersService.getById(id);
		if (!user) throw new Error(`Book with id ${id} does not exist`);

		const { username } = updateUserDto;
		if (username) {
			const userWithSameUsername = UsersService.getByUsername(username);
			if (userWithSameUsername)
				throw new AppError(
					HttpCode.BAD_REQUEST,
					`User with username ${username} already exists`
				);
		}

		return user;
	}

	public static validateUpdatingRole(
		id: number,
		updateUserRoleDto: UpdateUserRoleDto
	): User {
		const { roleId } = updateUserRoleDto;

		const role: Role | undefined = RoleRepository.cache.find(
			(role) => role.id === roleId
		);

		if (!role)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Role with id ${roleId} does not exist`
			);

		const user: User | undefined = UsersService.getById(id);
		if (!user)
			throw new AppError(HttpCode.BAD_REQUEST, `Book with id ${id} does not exist`);

		return user;
	}

	public static validateDeleting(id: number): User {
		const user: User | undefined = UsersService.getById(id);

		if (!user)
			throw new AppError(HttpCode.BAD_REQUEST, `User with id ${id} does not exist`);

		return user;
	}
}

export default UsersDataValidator;
