export type RequestType =
	| AuthRequest
	| AuthorsRequest
	| BooklistItemsRequest
	| BooksRequest
	| GenresRequest
	| UsersRequest
	| ReviewsRequest
	| StatusesRequest;

export type AuthRequest =
	| 'auth-create-user'
	| 'auth-create-moderator'
	| 'auth-create-admin'
	| 'auth-login';

export type AuthorsRequest =
	| 'authors-get-all'
	| 'authors-get'
	| 'authors-create'
	| 'authors-upload-image'
	| 'authors-update'
	| 'authors-delete';

export type BooklistItemsRequest =
	| 'booklist-items-create'
	| 'booklist-items-update'
	| 'booklist-items-delete';

export type BooksRequest =
	| 'books-get-all'
	| 'books-get'
	| 'books-create'
	| 'books-upload-image'
	| 'books-upload-file'
	| 'books-update'
	| 'books-delete';

export type GenresRequest =
	| 'genres-get-all'
	| 'genres-get'
	| 'genres-create'
	| 'genres-update'
	| 'genres-delete';

export type UsersRequest =
	| 'users-get-all'
	| 'users-get'
	| 'users-update'
	| 'users-update-role'
	| 'users-delete';

export type ReviewsRequest =
	| 'reviews-get-all'
	| 'reviews-get'
	| 'reviews-create'
	| 'reviews-update'
	| 'reviews-delete';

export type StatusesRequest =
	| 'statuses-get-all'
	| 'statuses-get'
	| 'statuses-create'
	| 'statuses-update'
	| 'statuses-delete';
