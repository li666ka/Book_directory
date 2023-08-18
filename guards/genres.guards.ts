import { isObject, isString } from './_base.guards';
import { CreateGenreDto } from '../controllers/genres/dto/create-genre.dto';
import { GenreFiltersDto } from '../controllers/genres/dto/genre-filters.dto';
import { UpdateGenreDto } from '../controllers/genres/dto/update-genre.dto';

export function isCreateGenreDto(input: any): input is CreateGenreDto {
	return isObject(input) && 'name' in input && isString(input.name);
}

export function isGenreFiltersDto(input: any): input is GenreFiltersDto {
	return isObject(input) && ('searchName' in input ? isString(input.searchName) : true);
}

export function isUpdateGenreDto(input: any): input is UpdateGenreDto {
	return isObject(input) && 'name' in input && isString(input.name);
}
