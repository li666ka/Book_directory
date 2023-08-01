import {
	AuthorsRequest,
	AuthRequest,
	BooklistItemsRequest,
	BooksRequest,
	GenresRequest,
	UsersRequest,
} from '../types/request.types';

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
		input === 'authors-upload-image' ||
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
		input === 'books-upload-image' ||
		input === 'books-upload-file' ||
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
