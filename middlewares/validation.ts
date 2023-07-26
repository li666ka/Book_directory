import { Request, Response } from 'express';

import AuthRequestValidator from './request_validators/auth_request.validator';
import UsersRequestValidator from './request_validators/users_request.validator';
import BooksRequestValidator from './request_validators/books_request.validator';
import AuthorsRequestValidator from './request_validators/authors_request.validator';
import BooklistItemsRequestValidator from './request_validators/booklist_items_request.validator';
import GenresRequestValidator from './request_validators/genres_request.validator';

import { RequestType } from '../types/request.type';

import {
	isAuthorsRequest,
	isAuthRequest,
	isBooklistItemsRequest,
	isBooksRequest,
	isGenresRequest,
	isUsersRequest,
} from '../guards/request_types.guards';

export function validate(
	req: RequestType
): (req: Request, res: Response, next: any) => any {
	if (isAuthRequest(req)) return AuthRequestValidator.validate(req);
	if (isAuthorsRequest(req)) return AuthorsRequestValidator.validate(req);
	if (isBooklistItemsRequest(req)) return BooklistItemsRequestValidator.validate(req);
	if (isBooksRequest(req)) return BooksRequestValidator.validate(req);
	if (isUsersRequest(req)) return UsersRequestValidator.validate(req);
	if (isGenresRequest(req)) return GenresRequestValidator.validate(req);

	throw new Error('Validator is not defined');
}
