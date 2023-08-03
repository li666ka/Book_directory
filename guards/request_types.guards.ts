import {
	AuthorsRequest,
	AuthRequest,
	BooklistItemsRequest,
	BooksRequest,
	GenresRequest,
	ReviewsRequest,
	StatusesRequest,
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

export function isReviewsRequest(input: any): input is ReviewsRequest {
	return (
		input === 'reviews-get-all' ||
		input === 'reviews-get' ||
		input === 'reviews-create' ||
		input === 'reviews-update' ||
		input === 'reviews-delete'
	);
}

export function isStatusesRequest(input: any): input is StatusesRequest {
	return (
		input === 'statuses-get-all' ||
		input === 'statuses-get' ||
		input === 'statuses-create' ||
		input === 'statuses-update' ||
		input === 'statuses-delete'
	);
}
