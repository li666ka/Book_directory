import AuthorsFiltersDto from '../controllers/authors/dto/authors_filters.dto';
import CreateAuthorDto from '../controllers/authors/dto/create_author.dto';
import UpdateAuthorDto from '../controllers/authors/dto/update_author.dto';
import { isInteger, isNull, isObject, isString } from './primitive_types.guards';

export function isAuthorsFiltersDto(
	input: AuthorsFiltersDto
): input is AuthorsFiltersDto {
	const { searchFullName } = input;
	return isObject(input) && (searchFullName ? isString(searchFullName) : true);
}

export function isCreateAuthorDto(input: any): input is CreateAuthorDto {
	const { fullName, bornAt, diedAt, info, book } = input;
	const { title, genreIds, description } = book;
	return (
		isObject(input) &&
		isString(fullName) &&
		isString(bornAt) &&
		(diedAt ? isString(diedAt) : true) &&
		isString(info) &&
		isObject(book) &&
		isString(title) &&
		isString(description) &&
		Array.isArray(genreIds) &&
		genreIds.every(isInteger)
	);
}

export function isUpdateAuthorDto(input: any): input is UpdateAuthorDto {
	const { fullName, bornAt, diedAt, info } = input;
	return (
		isObject(input) &&
		(fullName ? isString(fullName) : true) &&
		(bornAt ? isString(bornAt) : true) &&
		(diedAt ? isString(diedAt) || isNull(diedAt) : true) &&
		(info ? isString(info) : true)
	);
}
