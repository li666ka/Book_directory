import GenreFiltersDto from '../controllers/genres/dto/genre_filters.dto';
import GenreDto from '../controllers/genres/dto/genre.dto';
import { Genre, GenreRepository } from '../models/genre.model';
import GenreValidator from '../validators/genre.validator';
import { OkPacket } from 'mysql2';
import CreateGenreDto from '../controllers/genres/dto/create_genre.dto';
import UpdateGenreDto from '../controllers/genres/dto/update_genre.dto';

class GenresService {
	public static async find(
		genreFiltersDto: GenreFiltersDto | undefined
	): Promise<GenreDto[] | never> {
		let genres: Genre[] = await GenreRepository.getAll();

		if (genreFiltersDto) {
			if (genreFiltersDto.searchName)
				genres = this.filterByName(genres, genreFiltersDto.searchName);
		}

		return genres;
	}

	public static async findOne(id: string | undefined): Promise<GenreDto | never> {
		const genre: Genre = await GenreValidator.validateGetting(id);
		return this.parseToDto(genre);
	}

	public static async create(
		createGenreDto: CreateGenreDto | undefined
	): Promise<GenreDto | never> {
		await GenreValidator.validateCreating(createGenreDto);

		const { name } = createGenreDto;
		const okPacket: OkPacket = await GenreRepository.create(name);
		const newGenre: Genre | undefined = await GenreRepository.get(okPacket.insertId);

		if (!newGenre) throw new Error('Creating is failed');

		return this.parseToDto(newGenre);
	}

	public static async update(
		id: string | undefined,
		updateGenreDto: UpdateGenreDto | undefined
	): Promise<void | never> {
		await GenreValidator.validateUpdating(id, updateGenreDto);
		const { name } = updateGenreDto;
		await GenreRepository.update(name, +id);
	}

	public static async delete(id: string | undefined): Promise<void | never> {
		await GenreValidator.validateDeleting(id);
		await GenreRepository.delete(+id);
	}

	private static filterByName(genres: Genre[], name: string): Genre[] {
		return genres.filter((genre) => {
			const regExp = new RegExp(name, 'i');
			return regExp.test(genre.name);
		});
	}

	private static parseToDto(genre: Genre): GenreDto {
		return { id: genre.id, name: genre.name };
	}
}

export default GenresService;
