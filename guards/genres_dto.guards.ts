import CreateGenreDto from '../controllers/genres/dto/create_genre.dto';
import GenreFiltersDto from '../controllers/genres/dto/genre_filters.dto';
import UpdateGenreDto from '../controllers/genres/dto/update_genre.dto';
import { isObject, isString } from './primitive_types.guards';

export function isCreateGenreDto(input: any): input is CreateGenreDto {
	const { name } = input;
	return isObject(input) && isString(name);
}

export function isGenreFiltersDto(input: any): input is GenreFiltersDto {
	const { searchName } = input;
	return isObject(input) && isString(searchName);
}

export function isUpdateGenreDto(input: any): input is UpdateGenreDto {
	const { name } = input;
	return isObject(input) && isString(name);
}
