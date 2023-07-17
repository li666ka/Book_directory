import { Request, Response } from 'express';
import GenresService from '../../services/genres.service';
import GenreFiltersDto from './dto/genre_filters.dto';
import GenreDto from './dto/genre.dto';
import CreateGenreDto from './dto/create_genre.dto';
import UpdateGenreDto from './dto/update_genre.dto';

class GenresController {
	public static async getAll(
		req: Request<never, never, never, GenreFiltersDto>,
		res: Response<GenreDto[]>
	): Promise<void> {
		const genres: GenreDto[] = await GenresService.find(req.query);
		res.json(genres);
		return;
	}

	public static async get(
		req: Request<{ id: string }>,
		res: Response<GenreDto>
	): Promise<void> {
		try {
			const genre: GenreDto = await GenresService.findOne(req.params.id);
			res.json(genre);
		} catch (err: unknown) {
			res.sendStatus(400);
		}
		return;
	}

	public static async create(
		req: Request<never, never, CreateGenreDto>,
		res: Response<GenreDto>
	): Promise<void> {
		try {
			const genre: GenreDto = await GenresService.create(req.body);
			res.json(genre);
		} catch (err: unknown) {
			res.sendStatus(400);
		}
		return;
	}

	public static async update(
		req: Request<{ id: string }, never, UpdateGenreDto>,
		res: Response
	): Promise<void> {
		try {
			await GenresService.update(req.params.id, req.body);
			res.sendStatus(200);
		} catch (err: unknown) {
			console.log(err.message);
			res.sendStatus(400);
		}
		return;
	}

	public static async delete(
		req: Request<{ id: string }>,
		res: Response<GenreDto>
	): Promise<void> {
		try {
			await GenresService.delete(req.params.id);
			res.sendStatus(200);
		} catch (err: unknown) {
			res.sendStatus(400);
		}
		return;
	}
}

export default GenresController;
