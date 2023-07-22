import { User, UserRepository } from '../models/user.model';
import UpdateUserRoleDto from '../controllers/users/dto/update_user_role.dto';
import { Role, RoleRepository } from '../models/role.model';

class UserValidator {
	public static async validateUpdating(
		id: string,
		updateUserDto: UpdateUserDto | undefined
	): Promise<User | never> {
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
	): Promise<User | never> {
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
}

export default UserValidator;
