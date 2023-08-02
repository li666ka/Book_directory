import { UserFiltersDtoParsed } from '../types/dto_parsed.types';

import BooksService from './books.service';
import UserValidator from './validators/user.validator';

import { Review, ReviewRepository } from '../models/review.model';
import { BooklistItem, BooklistItemRepository } from '../models/booklist_item.model';
import { User, UserRepository } from '../models/user.model';
import { UserDto } from '../controllers/users/dto/user.dto';
import { UserDetailsDto } from '../controllers/users/dto/user_details.dto';
import { UpdateUserDto } from '../controllers/users/dto/update_user.dto';
import { UpdateUserRoleDto } from '../controllers/users/dto/update_user_role.dto';
import { BookDto } from '../controllers/books/dto/book.dto';
import { BooklistItemDto } from '../controllers/booklist_items/dto/booklist_item.dto';
import BooklistItemsService from './booklist_items.service';

class UsersService {
	public static async find(userFiltersDto: UserFiltersDtoParsed): Promise<UserDto[]> {
		let users: User[] = await UserRepository.getAll();

		if (Object.keys(userFiltersDto).length !== 0) {
			await UserValidator.validateGettingAll(userFiltersDto);

			users = this.filter(users, userFiltersDto);
		}

		const usersDto: UserDto[] = [];
		for (const user of users) {
			const userDto: UserDto = this.parseToDto(user);
			usersDto.push(userDto);
		}

		return usersDto;
	}

	public static async findOne(id: number): Promise<UserDetailsDto> {
		const user = await UserValidator.validateGetting(id);
		return this.parseToDetailsDto(user);
	}

	public static async update(id: number, updateUserDto: UpdateUserDto) {
		let user: User = await UserValidator.validateUpdating(id, updateUserDto);
		updateUserDto = updateUserDto as UpdateUserDto;

		const { username, password } = updateUserDto;

		if (username) {
			await this.updateUsername(user, username);
			user = (await UserRepository.get(user.id)) as User;
		}

		if (password) {
			await this.updatePassword(user, password);
			user = (await UserRepository.get(user.id)) as User;
		}
	}

	public static async updateRole(id: number, updateUserRoleDto: UpdateUserRoleDto) {
		const user = await UserValidator.validateUpdatingRole(id, updateUserRoleDto);
		const { roleId } = updateUserRoleDto;
		await UserRepository.update(roleId, user.username, user.password, user.id);
	}

	public static async delete(id: number) {
		const user: User = await UserValidator.validateDeleting(id);
		await UserRepository.delete(user.id);
	}

	public static parseToDto(user: User): UserDto {
		return {
			id: user.id,
			roleId: user.role_id,
			username: user.username,
			createdAt: user.created_at,
		};
	}

	private static async parseToDetailsDto(user: User): Promise<UserDetailsDto> {
		const userDto: UserDto = this.parseToDto(user);

		const booklistItems: BooklistItem[] = (
			await BooklistItemRepository.getAll()
		).filter((item) => item.user_id === user.id);

		const booklist = [];

		for (const item of booklistItems) {
			const itemDto: BooklistItemDto = await BooklistItemsService.parseToDto(item);
			const { book, status, review } = itemDto;
			booklist.push({ book, status, review });
		}

		return { ...userDto, booklist };
	}

	private static async updateUsername(user: User, newUsername: string) {
		await UserRepository.update(user.role_id, newUsername, user.password, user.id);
	}

	private static async updatePassword(user: User, newPassword: string) {
		await UserRepository.update(user.role_id, user.username, newPassword, user.id);
	}

	private static filter(users: User[], userFilters: UserFiltersDtoParsed) {
		const { searchUsername, roleIds } = userFilters;

		if (searchUsername)
			users = this.filterByUsername(users, searchUsername as string);
		console.log(users);
		if (roleIds) users = this.filterByRoles(users, roleIds);
		console.log(users);
		return users;
	}

	private static filterByUsername(users: User[], username: string): User[] {
		return users.filter((user) => {
			const reqExp = new RegExp(username);
			return reqExp.test(user.username);
		});
	}

	private static filterByRoles(users: User[], roleIds: Set<number>): User[] {
		console.log(roleIds);
		return users.filter((user) => {
			for (const roleId of roleIds) {
				if (user.role_id === roleId) return true;
			}
			return false;
		});
	}
}

export default UsersService;
