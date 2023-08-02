import { isInteger, isIntSet, isObject, isString, isStringArray } from './_base.guards';
import { BookFiltersDto } from '../controllers/books/dto/book_filters.dto';
import { CreateBookDto } from '../controllers/books/dto/create_book.dto';
import { UpdateBookDto } from '../controllers/books/dto/update_book.dto';

export function isBookFiltersDto(input: any): input is BookFiltersDto {
	return (
		isObject(input) &&
		(('searchTitle' in input ? isString(input.searchTitle) : true) ||
			('searchAuthorFullName' in input
				? isString(input.searchAuthorFullName)
				: true) ||
			('searchGenreIds' in input ? isStringArray(input.searchGenreIds) : true))
	);
}

export function isCreateBookDto(input: any): input is CreateBookDto {
	return (
		isObject(input) &&
		'authorId' in input &&
		isInteger(input.authorId) &&
		'title' in input &&
		isString(input.title) &&
		'description' in input &&
		isString(input.description) &&
		'genreIds' in input &&
		isIntSet(input.genreIds)
	);
}

export function isUpdateBookDto(input: any): input is UpdateBookDto {
	return (
		isObject(input) &&
		(('authorId' in input && isInteger(input.authorId)) ||
			('title' in input && isString(input.title)) ||
			('description' in input && isString(input.description)) ||
			('genreIds' in input && isIntSet(input.genreIds)))
	);
}
