import { Genre, GenreRepository } from '../models/genre.model';
import CreateGenreDto from '../controllers/genres/dto/create_genre.dto';
import UpdateGenreDto from '../controllers/genres/dto/update_genre.dto';

class GenreValidator {
	public static async validateGetting(id: string | undefined): Promise<Genre | never> {
		if (!id) throw new Error('id is undefined');

		const parsedId: number = +id;
		if (isNaN(parsedId)) throw new Error('id is invalid');

		const genre: Genre | undefined = await GenreRepository.get(parsedId);
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
		id: string | undefined,
		updateGenreDto: UpdateGenreDto | undefined
	): Promise<void | never> {
		if (!id) throw new Error('id is undefined');

		const parsedId: number = +id;
		if (isNaN(parsedId)) throw new Error('id is invalid');

		const genre: Genre | undefined = await GenreRepository.get(parsedId);
		if (!genre) throw new Error(`Genre with id ${id} does not exist`);

		if (!updateGenreDto) throw new Error('Dto is empty');

		const { name } = updateGenreDto;

		if (!name) throw new Error('name is undefined');

		const genreWithSameName: Genre | undefined = (
			await GenreRepository.getAll()
		).find((genre) => genre.name === name);

		if (genreWithSameName) throw new Error(`Genre with name ${name} already exists`);
	}

	public static async validateDeleting(id: string | undefined): Promise<void | never> {
		if (!id) throw new Error('id is undefined');

		const parsedId: number = +id;
		if (isNaN(parsedId)) throw new Error('id is invalid');

		const genre: Genre | undefined = await GenreRepository.get(parsedId);
		if (!genre) throw new Error(`Genre with id ${id} does not exist`);
	}
}

export default GenreValidator;
