import CreateUserDto from '../controllers/auth/dto/create_user.dto';
import LoginUserDto from '../controllers/auth/dto/login_user.dto';
import UpdateUserDto from '../controllers/users/dto/update_user.dto';
import UserFiltersDto from '../controllers/users/dto/user_filters.dto';
import UpdateUserRoleDto from '../controllers/users/dto/update_user_role.dto';
import { isInteger, isObject, isString } from './primitive_types.guards';

export function isUserFiltersDto(input: any): input is UserFiltersDto {
	const { searchUsername, roleIds } = input;
	return (
		isObject(input) &&
		(searchUsername ? isString(searchUsername) : true) &&
		(roleIds ? Array.isArray(roleIds) && roleIds.every(isInteger) : true)
	);
}

export function isCreateUserDto(input: any): input is CreateUserDto {
	const { username, password } = input;
	return isObject(input) && isString(username) && isString(password);
}

export function isLoginUserDto(input: any): input is LoginUserDto {
	const { username, password } = input;
	return isObject(input) && isString(username) && isString(password);
}

export function isUpdateUserDto(input: any): input is UpdateUserDto {
	const { username, password } = input;
	return isObject(input) && isString(username) && isString(password);
}

export function isUpdateUserRoleDto(input: any): input is UpdateUserRoleDto {
	const { roleId } = input;
	return isObject(input) && isInteger(roleId);
}
