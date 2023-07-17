import { Request, Response } from 'express';
import { Genre, GenreRepository } from '../../models/genre.model';

class GenresController {
	public static async getAll(req: Request, res: Response): Promise<void> {
		const genres: Genre[] = await GenreRepository.getAll();
		res.json(genres);
	}
}

export default GenresController;
