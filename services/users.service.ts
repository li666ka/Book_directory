import UserDto from '../controllers/users/dto/user.dto';
import UserDetailsDto from '../controllers/users/dto/user_details.dto';
import UserFiltersDto from '../controllers/users/dto/user_filters.dto';
import BookDto from '../controllers/books/dto/book.dto';

import BooksService from './books.service';

import { Review, ReviewRepository } from '../models/review.model';
import { BooklistItem, BooklistItemRepository } from '../models/booklist_item.model';
import { User, UserRepository } from '../models/user.model';
import UserValidator from '../validators/user.validator';
import UpdateUserRoleDto from '../controllers/users/dto/update_user_role.dto';

class UsersService {
	public static async find(
		userFilters: UserFiltersDto | undefined
	): Promise<UserDto[]> {
		// validation //
		userFilters = userFilters as UserFiltersDto;
		let users: User[] = await UserRepository.getAll();
		users = this.filter(users, userFilters);

		const usersDto: UserDto[] = [];
		for (const user of users) {
			const userDto: UserDto = this.parseToDto(user);
			usersDto.push(userDto);
		}

		return usersDto;
	}

	public static async findOne(id: string): Promise<UserDetailsDto> {
		// validation //
		id = id as string;
		const parsedId = parseInt(id, 10);

		const user = (await UserRepository.get(parsedId)) as User;

		return this.parseToDetailsDto(user);
	}

	public static async update(
		id: string,
		updateUserDto: UpdateUserDto | undefined
	): Promise<UserDetailsDto> {
		let user: User = await UserValidator.validateUpdating(id, updateUserDto);
		updateUserDto = updateUserDto as UpdateUserDto;

		const { username, password } = updateUserDto;

		if (username) {
			await this.updateUsername(user, username);
			user = await UserRepository.get(user.id);
		}

		if (password) {
			await this.updatePassword(user, password);
			user = await UserRepository.get(user.id);
		}

		return this.parseToDetailsDto(user);
	}

	public static async updateRole(
		id: string,
		updateUserRoleDto: UpdateUserRoleDto | undefined
	): Promise<UserDetailsDto> {
		const { user } = await UserValidator.validateUpdatingRole(id, updateUserRoleDto);

		updateUserRoleDto = updateUserRoleDto as UpdateUserRoleDto;
		const { roleId } = updateUserRoleDto;
		await UserRepository.update(roleId, user.username, user.password, user.id);
	}

	private static async updateUsername(user: User, newUsername: string): Promise<void> {
		await UserRepository.update(user.role_id, newUsername, user.password, user.id);
	}

	private static async updatePassword(user: User, newPassword: string): Promise<void> {
		await UserRepository.update(user.role_id, user.username, newPassword, user.id);
	}

	private static filter(users: User[], userFilters: UserFiltersDto) {
		const { searchUsername, roleIds } = userFilters;

		if (searchUsername) users = this.filterByUsername(users, searchUsername);
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

	private static filterByRoles(users: User[], roleIds: number[]): User[] {
		console.log(roleIds);
		return users.filter((user) => {
			for (const roleId of roleIds) {
				if (user.role_id === +roleId) return true;
			}
			return false;
		});
	}

	private static parseToDto(user: User): UserDto {
		return {
			id: user.id,
			roleId: user.role_id,
			username: user.username,
			createdAt: user.created_at,
		};
	}

	private static async parseToDetailsDto(user: User): Promise<UserDetailsDto> {
		const userDto: UserDto = this.parseToDto(user);
		const userDetailsDto = userDto as UserDetailsDto;

		const booklist: BooklistItem[] = (await BooklistItemRepository.getAll()).filter(
			(item) => item.user_id === user.id
		);

		userDetailsDto.booklist = [];

		for (const item of booklist) {
			const book: BookDto = await BooksService.findOne(item.book_id as string);
			const review: Review = await ReviewRepository.get(user.id, book.id);

			userDetailsDto.booklist.push({
				bookId: book.id,
				bookTitle: book.title,
				author: {
					id: book.author.id,
					fullName: book.author.fullName,
				},
				genres: book.genres,
				status: { id: item.status_id, name: 'null' },
				review: {
					score: review.score,
					comment: review.comment,
					createdAt: review.created_at,
				},
			});
		}

		return userDetailsDto;
	}
}

export default UsersService;
