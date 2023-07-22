import { Genre, GenreRepository } from '../models/genre.model';
import CreateGenreDto from '../controllers/genres/dto/create_genre.dto';
import UpdateGenreDto from '../controllers/genres/dto/update_genre.dto';

class GenreValidator {
	public static async validateGetting(id: string): Promise<Genre | never> {
		const idParsed: number = parseInt(id, 10);
		if (isNaN(idParsed)) throw new Error('id is invalid');

		const genre: Genre | undefined = await GenreRepository.get(idParsed);
		if (!genre) throw new Error(`Genre with id ${id} does not exist`);

		return genre;
	}

	public static async validateCreating(
		createGenreDto: CreateGenreDto | undefined
	): Promise<void | never> {
		if (!createGenreDto) throw new Error('Dto is empty');

		const { name } = createGenreDto;

		if (!name) throw new Error('name is undefined');

		const genreWithSameName: Genre | undefined = (
			await GenreRepository.getAll()
		).find((genre) => genre.name === name);

		if (genreWithSameName) throw new Error(`Genre with name ${name} already exists`);
	}

	public static async validateUpdating(
		id: string,
		updateGenreDto: UpdateGenreDto | undefined
	): Promise<void | never> {
		const idParsed: number = parseInt(id, 10);
		if (isNaN(idParsed)) throw new Error('id is invalid');

		const genre: Genre | undefined = await GenreRepository.get(idParsed);
		if (!genre) throw new Error(`Genre with id ${id} does not exist`);

		if (!updateGenreDto) throw new Error('Dto is empty');

		const { name } = updateGenreDto;

		if (!name) throw new Error('name is undefined');

		const genreWithSameName: Genre | undefined = (
			await GenreRepository.getAll()
		).find((genre) => genre.name === name);

		if (genreWithSameName) throw new Error(`Genre with name ${name} already exists`);
	}

	public static async validateDeleting(id: string): Promise<void | never> {
		const idParsed: number = parseInt(id, 10);
		if (isNaN(idParsed)) throw new Error('id is invalid');

		const genre: Genre | undefined = await GenreRepository.get(idParsed);
		if (!genre) throw new Error(`Genre with id ${id} does not exist`);
	}
}

export default GenreValidator;
