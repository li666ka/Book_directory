import { Request, Response } from 'express';

import AuthRequestValidator from '../validators/requests/auth.request.validator';
import UsersRequestValidator from '../validators/requests/users.request.validator';
import BooksRequestValidator from '../validators/requests/books.request.validator';
import AuthorsRequestValidator from '../validators/requests/authors.request.validator';
import BooklistItemsRequestValidator from '../validators/requests/booklist-items.request.validator';
import GenresRequestValidator from '../validators/requests/genres.request.validator';

import { RequestType } from '../types/request.types';

import {
	isAuthorsRequest,
	isAuthRequest,
	isBooklistItemsRequest,
	isBooksRequest,
	isGenresRequest,
	isReviewsRequest,
	isStatusesRequest,
	isUsersRequest,
} from '../guards/request_types.guards';
import ReviewsRequestValidator from '../validators/requests/reviews.request.validator';
import StatusesRequestValidator from '../validators/requests/statuses.request.validator';

export function validate(
	req: RequestType
): (req: Request, res: Response, next: any) => any {
	if (isAuthRequest(req)) return AuthRequestValidator.validate(req);
	if (isAuthorsRequest(req)) return AuthorsRequestValidator.validate(req);
	if (isBooklistItemsRequest(req)) return BooklistItemsRequestValidator.validate(req);
	if (isBooksRequest(req)) return BooksRequestValidator.validate(req);
	if (isUsersRequest(req)) return UsersRequestValidator.validate(req);
	if (isGenresRequest(req)) return GenresRequestValidator.validate(req);
	if (isReviewsRequest(req)) return ReviewsRequestValidator.validate(req);
	if (isStatusesRequest(req)) return StatusesRequestValidator.validate(req);

	throw new Error('Validator is not defined');
}
