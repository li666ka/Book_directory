import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import formidable from 'formidable';
import jwt from 'jsonwebtoken';

import { Book, BookRepository } from '../models/book.model';
import { Author, AuthorRepository } from '../models/author.model';
import { BookGenreRepository } from '../models/book_genre.model';
import { Genre, GenreRepository } from '../models/genre.model';
import { GetBooksQuery } from './queries/book.queries';
import { CONTENT_ROOT } from '../configs/db.config';
import { createBookPath } from '../utils/url';
import { JWT_SECRET, JWTPayload } from '../utils/jwt';
import { Role, RoleRepository } from '../models/role.model';

class BooksController {
	public static async list(
		req: Request<never, never, never, GetBooksQuery>,
		res: Response<Book[]>
	): Promise<void> {
		const { title, genres_ids } = req.query;
		let books: Book[] = await BookRepository.get(title, genres_ids);
		// console.log(books);
		res.json(books);
	}

	public static async get(req: Request<{ id: number }>, res: Response): Promise<void> {
		const bookId = +req.params.id;
		if (req.params.id) {
			const book: Book = await BookRepository.getById(bookId);
			res.json(book);
		}
		// res.json(req.params.id);
	}

	public static async author(
		req: Request<{ id: string }>,
		res: Response
	): Promise<void> {
		if (req.params.id !== 'undefined') {
			const bookId: number = +req.params.id;
			const book: Book = await BookRepository.getById(bookId);
			const author: Author | undefined = await AuthorRepository.getById(
				book.author_id
			);
			res.json(author);
		}
	}

	public static async create(
		req: Request<never, { token: string }>,
		res: Response
	): Promise<void> {
		const { token } = req.body;
		const decoded: JWTPayload = jwt.verify(
			token,
			JWT_SECRET
		) as unknown as JWTPayload;

		const role: Role | undefined = await RoleRepository.getById(decoded.role_id);

		let isPermitted: boolean = false;

		if (role) if (role.name === 'admin') isPermitted = true;

		if (isPermitted) {
			const form = new formidable.IncomingForm();
			// @ts-ignore
			form.multiples = true;
			form.parse(req, async (err, fields, files) => {
				console.log(fields);
				const { title, author_id, description } = fields;

				const author: Author | undefined = await AuthorRepository.getById(
					+author_id
				);

				if (author) {
					let genres: Genre[] = await GenreRepository.get();

					genres = genres.filter((genre) => fields[genre.name] === 'on');

					// @ts-ignore
					const newPath: string = await createBookPath(author.full_name, title);
					// @ts-ignore
					const imgUrl: string = path.join(newPath, files.img.originalFilename);
					// @ts-ignore
					const url: string = path.join(newPath, files.file.originalFilename);
					if (!fs.existsSync(newPath)) {
						fs.mkdirSync(newPath);
					}
					// @ts-ignore
					fs.renameSync(files.img.filepath, imgUrl);
					// @ts-ignore
					fs.renameSync(files.file.filepath, url);

					await BookRepository.create(
						+author_id,
						title as string,
						imgUrl.replace(CONTENT_ROOT, '').replaceAll('\\', '/'),
						description as string,
						url.replace(CONTENT_ROOT, '').replaceAll('\\', '/')
					);

					const book: Book | undefined =
						await BookRepository.getByTitleAndAuthorId(
							title as string,
							+author_id
						);

					if (book) {
						console.log('Genres: ' + genres);
						for (let i = 0; i < genres.length; ++i) {
							await BookGenreRepository.create(book.id, genres[i].id);
						}
						res.json({ result: 'Book was added successfully' });
					}
				}
			});
		} else {
			res.sendStatus(401);
		}
	}

	public static async update(
		req: Request<{ id: number }, { token: string }>,
		res: Response
	): Promise<void> {
		const { id } = req.params;
		const { token } = req.body;
		const decoded: JWTPayload = jwt.verify(token, JWT_SECRET) as JWTPayload;

		const role: Role | undefined = await RoleRepository.getById(decoded.role_id);

		let isPermitted: boolean = false;

		if (role) if (role.name === 'admin') isPermitted = true;

		if (isPermitted) {
			const form = new formidable.IncomingForm();

			// @ts-ignore
			form.multiples = true;
			form.parse(req, async (err, fields, files) => {
				console.log(fields);
				const { title, author_id, description } = fields;
				const book: Book = await BookRepository.getById(id);
				const author: Author | undefined = await AuthorRepository.getById(
					+author_id
				);

				if (author) {
					if (book.title !== title)
						// @ts-ignore
						await BookRepository.updateTitle(book.id, title);
					// @ts-ignore
					if (book.author_id !== author_id)
						// @ts-ignore
						await BookRepository.updateAuthorId(book.id, author_id);
					// @ts-ignore
					if (book.description !== description)
						// @ts-ignore
						await BookRepository.updateDescription(book.id, description);

					// @ts-ignore
					const newPath: string = await createBookPath(author.full_name, title);
					if (!fs.existsSync(newPath)) {
						fs.mkdirSync(newPath);
					}

					if (files.img) {
						// @ts-ignore
						const imgUrl: string = path.join(
							newPath,
							// @ts-ignore
							files.img.originalFilename
						);
						// @ts-ignore
						fs.renameSync(files.img.filepath, imgUrl);
						await BookRepository.updateImgUrl(
							id,
							imgUrl.replace(CONTENT_ROOT, '').replaceAll('\\', '/')
						);
					}

					if (files.file) {
						// @ts-ignore
						const url: string = path.join(
							newPath,
							// @ts-ignore
							files.file.originalFilename
						);
						// @ts-ignore
						fs.renameSync(files.file.filepath, url);
						await BookRepository.updateUrl(
							id,
							url.replace(CONTENT_ROOT, '').replaceAll('\\', '/')
						);
					}

					let genres: Genre[] = await GenreRepository.get();

					genres = genres.filter((genre) => fields[genre.name] === 'on');

					if (genres) {
						await BookGenreRepository.deleteByBookId(book.id);
						for (let i = 0; i < genres.length; i++) {
							await BookGenreRepository.create(book.id, genres[i].id);
						}
					}
				}

				res.sendStatus(200);
			});
		} else {
			res.sendStatus(400);
		}
	}

	public static async delete(
		req: Request<{ id: number }, { token: string }>,
		res: Response
	): Promise<void> {
		const { id } = req.params;
		const { token } = req.body;
		const decoded: JWTPayload = jwt.verify(token, JWT_SECRET) as JWTPayload;

		const role: Role | undefined = await RoleRepository.getById(decoded.role_id);

		let isPermitted: boolean = false;

		if (role) if (role.name === 'admin') isPermitted = true;

		if (isPermitted) {
			await BookRepository.delete(id);

			res.sendStatus(200);
		} else {
			res.sendStatus(400);
		}
	}
}

export default BooksController;
