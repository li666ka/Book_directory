import { Request, Response } from 'express';

import AuthorDto from './dto/author.dto';
import AuthorsFiltersDto from './dto/authors_filters.dto';

import AuthorsService from '../../services/authors.service';
import UpdateAuthorDto from './dto/update_author.dto';
import AuthorDetailsDto from './dto/author_details.dto';

class AuthorsController {
	public static async getAll(
		req: Request<never, never, never, AuthorsFiltersDto>,
		res: Response<AuthorDto[]>
	): Promise<void> {
		try {
			const authors: AuthorDto[] = await AuthorsService.find(req.query);
			res.json(authors);
		} catch (err: unknown) {
			res.sendStatus(400);
		}
		return;
	}

	public static async get(
		req: Request<{ id: string }>,
		res: Response<AuthorDetailsDto>
	): Promise<void> {
		try {
			const author: AuthorDetailsDto = await AuthorsService.findOne(req.params.id);
			res.json(author);
		} catch (err: unknown) {
			res.sendStatus(400);
		}
		return;
	}

	public static async create(
		req: Request<never, never, CreateAuthorDto>,
		res: Response<AuthorDetailsDto>
	): Promise<void> {
		try {
			req.files = req.files as { [key: string]: Express.Multer.File[] } | undefined;
			const newAuthor: AuthorDetailsDto = await AuthorsService.create(
				req.body,
				req.files
			);
			res.json(newAuthor);
		} catch (err: unknown) {
			console.log(err.message);
			res.sendStatus(400);
		}
		return;
	}

	public static async update(
		req: Request<{ id: string }, never, UpdateAuthorDto>,
		res: Response
	): Promise<void> {
		try {
			req.files = req.files as { [key: string]: Express.Multer.File[] } | undefined;
			await AuthorsService.update(req.params.id, req.body, req.files);

			res.sendStatus(200);
		} catch (err: unknown) {
			console.log(err.message);
			res.sendStatus(400);
		}
		return;
	}

	public static async delete(
		req: Request<{ id: string }>,
		res: Response
	): Promise<void> {
		try {
			await AuthorsService.delete(req.params.id);
			res.sendStatus(200);
		} catch (err: unknown) {
			res.sendStatus(400);
		}
		return;
	}
}

export default AuthorsController;
