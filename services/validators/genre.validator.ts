import { Genre, GenreRepository } from '../../models/genre.model';
import { CreateGenreDto } from '../../controllers/genres/dto/create_genre.dto';
import { UpdateGenreDto } from '../../controllers/genres/dto/update_genre.dto';
import { AppError, HttpCode } from '../../exceptions/app_error';

class GenreValidator {
	/**
	 * Validates input id.
	 * @param id
	 * Returns Genre object by input id.
	 */
	public static async validateGetting(id: number): Promise<Genre> {
		const genre: Genre | undefined = await GenreRepository.get(id);
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
	public static async validateCreating(createGenreDto: CreateGenreDto): Promise<void> {
		const { name } = createGenreDto;

		const genreWithSameName: Genre | undefined = (
			await GenreRepository.getAll()
		).find((genre) => genre.name === name);

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
	public static async validateUpdating(
		id: number,
		updateGenreDto: UpdateGenreDto
	): Promise<void | never> {
		const genre: Genre | undefined = await GenreRepository.get(id);
		if (!genre)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Genre with id ${id} does not exist`
			);

		const { name } = updateGenreDto;

		const genreWithSameName: Genre | undefined = (
			await GenreRepository.getAll()
		).find((genre) => genre.name === name);

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
	public static async validateDeleting(id: number): Promise<Genre> {
		const genre: Genre | undefined = await GenreRepository.get(id);
		if (!genre)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Genre with id ${id} does not exist`
			);

		return genre;
	}
}

export default GenreValidator;
