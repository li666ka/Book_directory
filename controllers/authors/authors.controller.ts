import { Request, Response } from 'express';

import AuthorsService from '../../services/authors.service';
import { parseToInt } from '../../utils/parsing.util';
import { HttpCode } from '../../exceptions/app_error';
import { AuthorsFiltersDto } from './dto/authors_filters.dto';
import { AuthorDto } from './dto/author.dto';
import { AuthorDetailsDto } from './dto/author_details.dto';
import { CreateAuthorDto } from './dto/create_author.dto';
import { UpdateAuthorDto } from './dto/update_author.dto';

class AuthorsController {
	public static async getAll(
		req: Request<never, never, never, AuthorsFiltersDto>,
		res: Response<AuthorDto[]>
	) {
		const { query } = req;
		const authors: AuthorDto[] = await AuthorsService.find(query);
		res.json(authors);
	}

	public static async get(
		req: Request<{ id: string }>,
		res: Response<AuthorDetailsDto>
	) {
		const { id } = req.params;
		const idParsed: number = parseToInt(id);
		const author: AuthorDetailsDto = await AuthorsService.findOne(idParsed);
		res.json(author);
	}

	public static async create(
		req: Request<never, never, CreateAuthorDto>,
		res: Response<AuthorDetailsDto>
	) {
		const { body } = req;
		const newAuthor: AuthorDetailsDto = await AuthorsService.create(body);
		res.json(newAuthor);
	}

	public static async update(
		req: Request<{ id: string }, never, UpdateAuthorDto>,
		res: Response
	) {
		const { id } = req.params;
		const { body } = req;
		const idParsed: number = parseToInt(id);

		await AuthorsService.update(idParsed, body);

		res.sendStatus(HttpCode.OK);
	}

	public static async uploadImage(req: Request<{ id: string }>, res: Response) {
		const { id } = req.params;
		let { file } = req;
		const idParsed: number = parseToInt(id);
		file = file as Express.Multer.File;
		await AuthorsService.uploadImage(idParsed, file);

		res.sendStatus(HttpCode.OK);
	}

	public static async delete(req: Request<{ id: string }>, res: Response) {
		const { id } = req.params;
		const idParsed: number = parseToInt(id);
		await AuthorsService.delete(idParsed);
		res.sendStatus(HttpCode.OK);
	}
}

export default AuthorsController;
