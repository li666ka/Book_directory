// import { Request, Response } from 'express';
// import jwt from 'jsonwebtoken';
// import { Author, AuthorRepository } from '../models/author.model';
// import { Book, BookRepository } from '../models/book.model';
// import { GetAuthorsQuery } from './queries/author.queries';
// import { JWTPayload, JWT_SECRET } from '../services/jwt';
// import { Role, RoleRepository } from '../models/role.model';
//
// class AuthorsController {
// 	public static async list(
// 		req: Request<never, never, never, GetAuthorsQuery>,
// 		res: Response<Author[]>
// 	): Promise<void> {
// 		console.log(req.query);
//
// 		const { full_name } = req.query;
//
// 		const authors: Author[] = await AuthorRepository.get(full_name);
//
// 		res.json(authors);
// 	}
//
// 	public static async get(
// 		req: Request<{ id: number }>,
// 		res: Response<Author>
// 	): Promise<void> {
// 		const { id } = req.params;
//
// 		const author: Author | undefined = await AuthorRepository.getById(id);
//
// 		res.json(author);
// 	}
//
// 	public static async books(
// 		req: Request<{ id: number }>,
// 		res: Response<Book[]>
// 	): Promise<void> {
// 		const { id } = req.params;
// 		const books: Book[] = await BookRepository.getByAuthorId(id);
// 		res.json(books);
// 	}
//
// 	public static async create(
// 		req: Request<
// 			never,
// 			{
// 				fullName: string;
// 				bornAt: string;
// 				diedAt?: string;
// 				img: Buffer;
// 				info: string;
//
// 				token: string;
// 			}
// 		>,
// 		res: Response
// 	): Promise<void> {
// 		const {
// 			fullName,
// 			bornAt,
// 			diedAt,
// 			img,
// 			info,
//
// 			token,
// 		} = req.body;
//
// 		const decoded: JWTPayload = jwt.verify(token, JWT_SECRET) as JWTPayload;
//
// 		const role: Role | undefined = await RoleRepository.getById(decoded.role_id);
//
// 		let isPermitted: boolean = false;
//
// 		if (role) if (role.name === 'admin') isPermitted = true;
//
// 		if (isPermitted) {
// 			await AuthorRepository.create(fullName, bornAt, img, info, diedAt);
//
// 			const newAuthor: Author | undefined = await AuthorRepository.getByName(
// 				fullName
// 			);
//
// 			if (newAuthor) res.json(newAuthor);
// 			else res.sendStatus(400);
// 		} else res.sendStatus(401);
// 	}
//
// 	public static async delete(
// 		req: Request<{ id: number }, { token: string }>,
// 		res: Response
// 	): Promise<void> {
// 		const { id } = req.params;
// 		const { token } = req.body;
//
// 		const decoded: JWTPayload = jwt.verify(token, JWT_SECRET) as JWTPayload;
//
// 		const role: Role | undefined = await RoleRepository.getById(decoded.role_id);
//
// 		let isPermitted: boolean = false;
//
// 		if (role) if (role.name === 'admin') isPermitted = true;
//
// 		if (isPermitted) {
// 			await AuthorRepository.delete(id);
// 			res.sendStatus(200);
// 		} else res.json(401);
// 	}
// }
//
// export default AuthorsController;
