import { AuthRequest } from './auth_request.type';
import { AuthorsRequest } from './authors_request.type';
import { BooklistItemsRequest } from './booklist_items_request.type';
import { BooksRequest } from './books_request.type';
import { GenresRequest } from './genres_request.type';
import { UsersRequest } from './users_request.type';

export type RequestType =
	| AuthRequest
	| AuthorsRequest
	| BooklistItemsRequest
	| BooksRequest
	| GenresRequest
	| UsersRequest;
