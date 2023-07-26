import { AuthRequest } from '../types/auth_request.type';
import { AuthorsRequest } from '../types/authors_request.type';
import { BooklistItemsRequest } from '../types/booklist_items_request.type';
import { BooksRequest } from '../types/books_request.type';
import { UsersRequest } from '../types/users_request.type';
import { GenresRequest } from '../types/genres_request.type';

export function isAuthRequest(input: any): input is AuthRequest {
	return (
		input === 'auth-create-user' ||
		input === 'auth-create-moderator' ||
		input === 'auth-create-admin' ||
		input === 'auth-login'
	);
}

export function isAuthorsRequest(input: any): input is AuthorsRequest {
	return (
		input === 'authors-get-all' ||
		input === 'authors-get' ||
		input === 'authors-create' ||
		input === 'authors-update' ||
		input === 'authors-delete'
	);
}

export function isBooklistItemsRequest(input: any): input is BooklistItemsRequest {
	return (
		input === 'booklist-items-create' ||
		input === 'booklist-items-update' ||
		input === 'booklist-items-delete'
	);
}

export function isBooksRequest(input: any): input is BooksRequest {
	return (
		input === 'books-get-all' ||
		input === 'books-get' ||
		input === 'books-create' ||
		input === 'books-update' ||
		input === 'books-delete'
	);
}

export function isUsersRequest(input: any): input is UsersRequest {
	return (
		input === 'users-get-all' ||
		input === 'users-get' ||
		input === 'users-update' ||
		input === 'users-update-role' ||
		input === 'users-delete'
	);
}

export function isGenresRequest(input: any): input is GenresRequest {
	return (
		input === 'genres-get-all' ||
		input === 'genres-get' ||
		input === 'genres-create' ||
		input === 'genres-update' ||
		input === 'genres-delete'
	);
}
