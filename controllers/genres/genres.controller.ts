import { Request, Response } from 'express';
import GenresService from '../../services/genres.service';

import { HttpCode } from '../../exceptions/app_error';
import { parseId } from '../../utils/parsing.util';
import { GenreFiltersDto } from './dto/genre_filters.dto';
import { GenreDto } from './dto/genre.dto';
import { CreateGenreDto } from './dto/create_genre.dto';
import { UpdateGenreDto } from './dto/update_genre.dto';

class GenresController {
	public static async getAll(
		req: Request<never, never, never, GenreFiltersDto>,
		res: Response<GenreDto[]>
	) {
		const { query } = req;
		const genres: GenreDto[] = await GenresService.find(query);
		res.json(genres);
	}

	public static async get(req: Request<{ id: string }>, res: Response<GenreDto>) {
		const { id } = req.params;
		const idParsed = parseId(id);
		const genre: GenreDto = await GenresService.findOne(idParsed);
		res.json(genre);
	}

	public static async create(
		req: Request<never, never, CreateGenreDto>,
		res: Response<GenreDto>
	) {
		const { body } = req;
		const genre: GenreDto = await GenresService.create(body);
		res.json(genre);
	}

	public static async update(
		req: Request<{ id: string }, never, UpdateGenreDto>,
		res: Response
	) {
		const { id } = req.params;
		const { body } = req;

		const idParsed = parseId(id);

		await GenresService.update(idParsed, body);
		res.sendStatus(HttpCode.OK);
	}

	public static async delete(req: Request<{ id: string }>, res: Response<GenreDto>) {
		const { id } = req.params;
		const idParsed = parseId(id);

		await GenresService.delete(idParsed);
		res.sendStatus(HttpCode.OK);
	}
}

export default GenresController;
