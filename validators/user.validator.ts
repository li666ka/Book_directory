import UpdateUserRoleDto from '../controllers/users/dto/update_user_role.dto';
import UpdateUserDto from '../controllers/users/dto/update_user.dto';
import UserFiltersDto from '../controllers/users/dto/user_filters.dto';

import { Role, RoleRepository } from '../models/role.model';
import { User, UserRepository } from '../models/user.model';

class UserValidator {
	/**
	 * Validates UserFiltersDto object.
	 * Changes UserFiltersDto object (parse roleIds to number[]).
	 * @param userFiltersDto
	 */
	public static async validateGettingAll(
		userFiltersDto: UserFiltersDto | undefined
	): Promise<void> {
		if (!userFiltersDto) return;

		const { roleIds } = userFiltersDto;

		if (roleIds) {
			const roleIdsParsed = roleIds.map((roleId) => parseInt(roleId as string, 10));
			for (const roleId of roleIdsParsed) {
				if (isNaN(roleId)) throw new Error('Incorrect roleId');

				const role: Role | undefined = await RoleRepository.get(roleId);

				if (!role) throw new Error(`Role with is ${roleId} does not exist`);
			}
			userFiltersDto.roleIds = roleIdsParsed;
		}
	}

	public static async validateGetting(id: string): Promise<User> {
		const idParsed: number = parseInt(id, 10);
		if (isNaN(idParsed)) throw new Error('id is invalid');

		const user: User | undefined = await UserRepository.get(idParsed);
		if (!user) throw new Error(`User with id ${id} does not exist`);

		return user;
	}

	public static async validateUpdating(
		id: string,
		updateUserDto: UpdateUserDto | undefined
	): Promise<User> {
		const idParsed: number = parseInt(id, 10);
		if (isNaN(idParsed)) throw new Error('id is invalid');

		if (!updateUserDto) throw new Error('Dto is undefined');

		const user: User | undefined = await UserRepository.get(idParsed);
		if (!user) throw new Error(`Book with id ${id} does not exist`);

		return user;
	}

	public static async validateUpdatingRole(
		id: string,
		updateUserRoleDto: UpdateUserRoleDto | undefined
	): Promise<User> {
		const idParsed: number = parseInt(id, 10);
		if (isNaN(idParsed)) throw new Error('id is invalid');

		if (!updateUserRoleDto) throw new Error('Dto is undefined');

		const { roleId } = updateUserRoleDto;

		if (!roleId) throw new Error('roleId is undefined');

		const role: Role | undefined = await RoleRepository.get(roleId);

		if (!role) throw new Error(`Role with id ${roleId} does not exist`);

		const user: User | undefined = await UserRepository.get(idParsed);
		if (!user) throw new Error(`Book with id ${id} does not exist`);

		return user;
	}

	public static async validateDeleting(id: string): Promise<User> {
		const idParsed: number = parseInt(id, 10);
		if (isNaN(idParsed)) throw new Error('id is invalid');

		const user: User | undefined = await UserRepository.get(idParsed);

		if (!user) throw new Error(`User with id ${id} does not exist`);

		return user;
	}
}

export default UserValidator;
