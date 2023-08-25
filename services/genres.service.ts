import { OkPacket } from 'mysql2';

import { Genre, GenreRepository } from '../models/genre.model';

import GenresDataValidator from '../validators/data/genres.data.validator';
import { GenreFiltersDto } from '../controllers/genres/dto/genre-filters.dto';
import { GenreDto } from '../controllers/genres/dto/genre.dto';
import { CreateGenreDto } from '../controllers/genres/dto/create-genre.dto';
import { UpdateGenreDto } from '../controllers/genres/dto/update-genre.dto';

class GenresService {
	public static find(genreFiltersDto: GenreFiltersDto): GenreDto[] {
		let genres: Genre[] = GenreRepository.cache;

		const { searchName } = genreFiltersDto;
		if (searchName) genres = this.filterByName(genres, searchName);

		return genres;
	}

	public static findOne(id: number): GenreDto {
		const genre: Genre = GenresDataValidator.validateGetting(id);
		return this.parseToDto(genre);
	}

	public static getById(id: number): Genre | undefined {
		return GenreRepository.cache.find((genre) => genre.id === id);
	}

	public static getByName(name: string): Genre | undefined {
		return GenreRepository.cache.find((genre) => genre.name === name);
	}

	public static async create(createGenreDto: CreateGenreDto): Promise<GenreDto> {
		await GenresDataValidator.validateCreating(createGenreDto);

		const { name } = createGenreDto;
		const okPacket: OkPacket = await GenreRepository.create(name);
		const newGenre: Genre | undefined = await GenreRepository.get(okPacket.insertId);

		if (!newGenre) throw new Error('Creating is failed');

		await GenreRepository.store();
		return this.parseToDto(newGenre);
	}

	public static async update(id: number, updateGenreDto: UpdateGenreDto) {
		await GenresDataValidator.validateUpdating(id, updateGenreDto);
		const { name } = updateGenreDto;
		await GenreRepository.update(name, +id);
		await GenreRepository.store();
	}

	public static async delete(id: number) {
		const genre: Genre = await GenresDataValidator.validateDeleting(id);
		await GenreRepository.delete(genre.id);
		await GenreRepository.store();
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
