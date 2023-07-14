import { Request, Response } from 'express';

import AuthorDto from './dto/author.dto';
import AuthorsFiltersDto from './dto/authors_filters.dto';

import AuthorsService from '../../services/authors.service';

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
		res: Response<AuthorDto>
	): Promise<void> {
		try {
			const author: AuthorDto = await AuthorsService.findOne(req.params.id);
			res.json(author);
		} catch (err: unknown) {
			res.sendStatus(400);
		}
		return;
	}

	public static async create(
		req: Request<never, never, CreateAuthorDto>,
		res: Response<AuthorDto>
	): Promise<void> {
		try {
			req.files = req.files as { [key: string]: Express.Multer.File[] } | undefined;
			const newAuthor: AuthorDto = await AuthorsService.create(req.body, req.files);
			res.json(newAuthor);
		} catch (err: unknown) {
			console.log(err.message);
			res.sendStatus(400);
		}
		return;
	}

	// public static async delete(
	// 	req: Request<{ id: number }, { token: string }>,
	// 	res: Response
	// ): Promise<void> {
	// 	const { id } = req.params;
	// 	const { token } = req.body;
	//
	// 	const decoded: JWTPayload = jwt.verify(token, JWT_SECRET) as JWTPayload;
	//
	// 	const role: Role | undefined = await RoleRepository.getById(decoded.role_id);
	//
	// 	let isPermitted: boolean = false;
	//
	// 	if (role) if (role.name === 'admin') isPermitted = true;
	//
	// 	if (isPermitted) {
	// 		await AuthorRepository.delete(id);
	// 		res.sendStatus(200);
	// 	} else res.json(401);
	// }
}

export default AuthorsController;
