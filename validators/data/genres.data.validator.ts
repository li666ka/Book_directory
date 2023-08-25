import { Genre, GenreRepository } from '../../models/genre.model';
import { CreateGenreDto } from '../../controllers/genres/dto/create-genre.dto';
import { UpdateGenreDto } from '../../controllers/genres/dto/update-genre.dto';
import { AppError, HttpCode } from '../../exceptions/app-error';
import GenresService from '../../services/genres.service';

class GenresDataValidator {
	/**
	 * Validates input id.
	 * @param id
	 * Returns Genre object by input id.
	 */
	public static validateGetting(id: number): Genre {
		const genre: Genre | undefined = GenresService.getById(id);
		if (!genre)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Genre with id ${id} does not exist`
			);

		return genre;
	}

	/**
	 * Validates CreateGenreDto object.
	 * @param createGenreDto
	 */
	public static validateCreating(createGenreDto: CreateGenreDto) {
		const { name } = createGenreDto;

		const genreWithSameName: Genre | undefined = GenresService.getByName(name);

		if (genreWithSameName)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Genre with name ${name} already exists`
			);
	}

	/**
	 * Validates input id and UpdateGenreDto object.
	 * @param id
	 * @param updateGenreDto
	 */
	public static validateUpdating(id: number, updateGenreDto: UpdateGenreDto) {
		const genre: Genre | undefined = GenresService.getById(id);
		if (!genre)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Genre with id ${id} does not exist`
			);

		const { name } = updateGenreDto;

		const genreWithSameName: Genre | undefined = GenresService.getByName(name);

		if (genreWithSameName)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Genre with name ${name} already exists`
			);
	}

	/**
	 * Validates input id.
	 * @param id
	 * Returns Genre object by input id.
	 */
	public static validateDeleting(id: number): Genre {
		const genre: Genre | undefined = GenresService.getById(id);
		if (!genre)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Genre with id ${id} does not exist`
			);

		return genre;
	}
}

export default GenresDataValidator;
