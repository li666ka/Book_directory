import { Role, RoleRepository } from '../../models/role.model';
import { User, UserRepository } from '../../models/user.model';
import { UserFiltersDtoParsed } from '../../types/dto-parsed.types';
import { UpdateUserDto } from '../../controllers/users/dto/update_user.dto';
import { UpdateUserRoleDto } from '../../controllers/users/dto/update_user_role.dto';
import { AppError, HttpCode } from '../../exceptions/app-error';

class UserDataValidator {
	/**
	 * Validates UserFiltersDto object.
	 * Changes UserFiltersDto object (parse roleIds to number[]).
	 * @param userFiltersDto
	 */
	public static async validateGettingAll(
		userFiltersDto: UserFiltersDtoParsed
	): Promise<void> {
		if (!userFiltersDto) return;

		const { roleIds } = userFiltersDto;

		if (roleIds) {
			for (const roleId of roleIds) {
				const role: Role | undefined = await RoleRepository.get(roleId);

				if (!role)
					throw new AppError(
						HttpCode.BAD_REQUEST,
						`Role with is ${roleId} does not exist`
					);
			}
			userFiltersDto.roleIds = roleIds;
		}
	}

	public static async validateGetting(id: number): Promise<User> {
		const user: User | undefined = await UserRepository.get(id);
		if (!user)
			throw new AppError(HttpCode.BAD_REQUEST, `User with id ${id} does not exist`);

		return user;
	}

	public static async validateUpdating(
		id: number,
		updateUserDto: UpdateUserDto
	): Promise<User> {
		const user: User | undefined = await UserRepository.get(id);
		if (!user) throw new Error(`Book with id ${id} does not exist`);

		const { username } = updateUserDto;
		if (username) {
			const userWithSameUsername = (await UserRepository.getAll()).find(
				(user) => user.username === username
			);
			if (userWithSameUsername)
				throw new AppError(
					HttpCode.BAD_REQUEST,
					`User with username ${username} already exists`
				);
		}

		return user;
	}

	public static async validateUpdatingRole(
		id: number,
		updateUserRoleDto: UpdateUserRoleDto
	): Promise<User> {
		const { roleId } = updateUserRoleDto;

		const role: Role | undefined = await RoleRepository.get(roleId);

		if (!role)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Role with id ${roleId} does not exist`
			);

		const user: User | undefined = await UserRepository.get(id);
		if (!user)
			throw new AppError(HttpCode.BAD_REQUEST, `Book with id ${id} does not exist`);

		return user;
	}

	public static async validateDeleting(id: number): Promise<User> {
		const user: User | undefined = await UserRepository.get(id);

		if (!user)
			throw new AppError(HttpCode.BAD_REQUEST, `User with id ${id} does not exist`);

		return user;
	}
}

export default UserDataValidator;
