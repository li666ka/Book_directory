import BookFiltersDto from '../controllers/books/dto/book_filters.dto';
import CreateBookDto from '../controllers/books/dto/create_book.dto';
import UpdateBookDto from '../controllers/books/dto/update_book.dto';
import { isInteger, isObject, isString } from './primitive_types.guards';
import { isSetNumber } from './set.guards';

export function isBookFiltersDto(input: any): input is BookFiltersDto {
	const { searchTitle, searchAuthorFullName, searchGenreIds } = input;
	return (
		isObject(input) &&
		(searchTitle ? isString(searchTitle) : true) &&
		(searchAuthorFullName ? isString(searchAuthorFullName) : true) &&
		(searchGenreIds ? isSetNumber(searchGenreIds) : true)
	);
}

export function isCreateBookDto(input: any): input is CreateBookDto {
	const { authorId, title, description, genreIds } = input;
	return (
		isObject(input) &&
		isInteger(authorId) &&
		isString(title) &&
		isString(description) &&
		(genreIds ? isSetNumber(genreIds) : false)
	);
}

export function isUpdateBookDto(input: any): input is UpdateBookDto {
	const { authorId, title, description, genreIds } = input;
	return (
		isObject(input) &&
		(authorId ? isInteger(authorId) : true) &&
		(title ? isString(title) : true) &&
		(description ? isString(description) : true) &&
		(genreIds ? isSetNumber(genreIds) : true)
	);
}
