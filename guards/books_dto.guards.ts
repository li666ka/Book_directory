import BookFiltersDto from '../controllers/books/dto/book_filters.dto';
import CreateBookDto from '../controllers/books/dto/create_book.dto';
import UpdateBookDto from '../controllers/books/dto/update_book.dto';
import { isInteger, isObject, isString } from './primitive_types.guards';

export function isBookFiltersDto(input: any): input is BookFiltersDto {
	const { searchTitle, searchAuthorFullName, searchGenreIds } = input;
	return (
		isObject(input) &&
		(searchTitle ? isString(searchTitle) : true) &&
		(searchAuthorFullName ? isString(searchAuthorFullName) : true) &&
		(searchGenreIds
			? Array.isArray(searchGenreIds) && searchGenreIds.every(isInteger)
			: true)
	);
}

export function isCreateBookDto(input: any): input is CreateBookDto {
	const { authorId, title, description, genreIds } = input;
	return (
		isObject(input) &&
		isInteger(authorId) &&
		isString(title) &&
		isString(description) &&
		(genreIds ? Array.isArray(genreIds) && genreIds.every(isInteger) : false)
	);
}

export function isUpdateBookDto(input: any): input is UpdateBookDto {
	const { authorId, title, description, genreIds } = input;
	return (
		isObject(input) &&
		(authorId ? isInteger(authorId) : true) &&
		(title ? isString(title) : true) &&
		(description ? isString(description) : true) &&
		(genreIds ? Array.isArray(genreIds) && genreIds.every(isInteger) : true)
	);
}
