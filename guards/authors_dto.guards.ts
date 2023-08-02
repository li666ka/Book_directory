import { isIntSet, isNull, isObject, isString } from './_base.guards';
import { AuthorsFiltersDto } from '../controllers/authors/dto/authors_filters.dto';
import { CreateAuthorDto } from '../controllers/authors/dto/create_author.dto';
import { UpdateAuthorDto } from '../controllers/authors/dto/update_author.dto';

export function isAuthorsFiltersDto(
	input: AuthorsFiltersDto
): input is AuthorsFiltersDto {
	return (
		isObject(input) &&
		('searchFullName' in input ? isString(input.searchFullName) : true)
	);
}

export function isCreateAuthorDto(input: any): input is CreateAuthorDto {
	return (
		isObject(input) &&
		'fullName' in input &&
		isString(input.fullName) &&
		'bornAt' in input &&
		isString(input.bornAt) &&
		'diedAt' in input &&
		(isString(input.diedAt) || isNull(input.diedAt)) &&
		'info' in input &&
		isString(input.info) &&
		'book' in input &&
		isObject(input.book) &&
		'title' in input.book &&
		isString(input.book.title) &&
		'description' in input.book &&
		isString(input.book.description) &&
		'genreIds' in input.book &&
		isIntSet(input.book.genreIds)
	);
}

export function isUpdateAuthorDto(input: any): input is UpdateAuthorDto {
	return (
		isObject(input) &&
		(('fullName' in input ? isString(input.fullName) : true) ||
			('bornAt' in input ? isString(input.bornAt) : true) ||
			('diedAt' in input ? isString(input.diedAt) || isNull(input.diedAt) : true) ||
			('info' in input ? isString(input.info) : true))
	);
}
