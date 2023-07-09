import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import { Book, BookRepository } from '../../models/book.model';
import { Author, AuthorRepository } from '../../models/author.model';
import { BookGenreRepository } from '../../models/book_genre.model';
import { Genre, GenreRepository } from '../../models/genre.model';
import { Role, RoleRepository } from '../../models/role.model';

import { CONTENT_ROOT } from '../../configs/db.config';
import { JWT_SECRET, JwtPayloadExt } from '../../services/jwt';

import GetBooksDto from './dto/get_books.dto';
import BookDto from './dto/book.dto';
import CreateBookDto from './dto/create_book.dto';

import BooksService from '../../services/books.service';
import BookValidator from '../../validation/book.validation';

class BooksController {
	public static async getAll(
		req: Request<never, never, never, GetBooksDto>,
		res: Response<BookDto[]>
	) {
		const books: BookDto[] = await BooksService.find(req.query);
		res.json(books);
	}

	public static async get(req: Request<never, GetBookDto>, res: Response) {
		const book: BookDto | undefined = await BooksService.findOne(req.params);
		res.json(book);
	}

	public static async create(
		req: Request<never, CreateBookDto>,
		res: Response
	): Promise<void> {
		console.log(req.body);

		let validationResult;
		try {
			validationResult = await BookValidator.validateCreationData(
				req.body,
				req.files
			);
		} catch (err: unknown) {
			console.log(err.message);
			return;
		}

		const { createBookDto, imageFile, bookFile, author } = validationResult;

		const newBook: BookDto = await BooksService.create(
			createBookDto,
			imageFile,
			bookFile,
			author
		);

		res.json(newBook);
	}

	// public static async update(
	// 	req: Request<{ id: number }, { token: string }>,
	// 	res: Response
	// ): Promise<void> {
	// 	const { id } = req.params;
	// 	const { token } = req.body;
	// 	const decoded: JWTPayload = jwt.verify(token, JWT_SECRET) as JWTPayload;
	//
	// 	const role: Role | undefined = await RoleRepository.getById(decoded.role_id);
	//
	// 	let isPermitted: boolean = false;
	//
	// 	if (role) if (role.name === 'admin') isPermitted = true;
	//
	// 	if (isPermitted) {
	// 		const form = new formidable.IncomingForm();
	//
	// 		// @ts-ignore
	// 		form.multiples = true;
	// 		form.parse(req, async (err, fields, files) => {
	// 			console.log(fields);
	// 			const { title, author_id, description } = fields;
	// 			const book: Book = await BookRepository.getById(id);
	// 			const author: Author | undefined = await AuthorRepository.getById(
	// 				+author_id
	// 			);
	//
	// 			if (author) {
	// 				if (book.title !== title)
	// 					// @ts-ignore
	// 					await BookRepository.updateTitle(book.id, title);
	// 				// @ts-ignore
	// 				if (book.author_id !== author_id)
	// 					// @ts-ignore
	// 					await BookRepository.updateAuthorId(book.id, author_id);
	// 				// @ts-ignore
	// 				if (book.description !== description)
	// 					// @ts-ignore
	// 					await BookRepository.updateDescription(book.id, description);
	//
	// 				// @ts-ignore
	// 				const newPath: string = await createBookPath(author.full_name, title);
	// 				if (!fs.existsSync(newPath)) {
	// 					fs.mkdirSync(newPath);
	// 				}
	//
	// 				if (files.img) {
	// 					// @ts-ignore
	// 					const imgUrl: string = path.join(
	// 						newPath,
	// 						// @ts-ignore
	// 						files.img.originalFilename
	// 					);
	// 					// @ts-ignore
	// 					fs.renameSync(files.img.filepath, imgUrl);
	// 					await BookRepository.updateImgUrl(
	// 						id,
	// 						imgUrl.replace(CONTENT_ROOT, '').replaceAll('\\', '/')
	// 					);
	// 				}
	//
	// 				if (files.file) {
	// 					// @ts-ignore
	// 					const url: string = path.join(
	// 						newPath,
	// 						// @ts-ignore
	// 						files.file.originalFilename
	// 					);
	// 					// @ts-ignore
	// 					fs.renameSync(files.file.filepath, url);
	// 					await BookRepository.updateUrl(
	// 						id,
	// 						url.replace(CONTENT_ROOT, '').replaceAll('\\', '/')
	// 					);
	// 				}
	//
	// 				let genres: Genre[] = await GenreRepository.get();
	//
	// 				genres = genres.filter((genre) => fields[genre.name] === 'on');
	//
	// 				if (genres) {
	// 					await BookGenreRepository.deleteByBookId(book.id);
	// 					for (let i = 0; i < genres.length; i++) {
	// 						await BookGenreRepository.create(book.id, genres[i].id);
	// 					}
	// 				}
	// 			}
	//
	// 			res.sendStatus(200);
	// 		});
	// 	} else {
	// 		res.sendStatus(400);
	// 	}
	// }
	//
	// public static async delete(
	// 	req: Request<{ id: number }, { token: string }>,
	// 	res: Response
	// ): Promise<void> {
	// 	const { id } = req.params;
	// 	const { token } = req.body;
	// 	const decoded: JWTPayload = jwt.verify(token, JWT_SECRET) as JWTPayload;
	//
	// 	const role: Role | undefined = await RoleRepository.getById(decoded.role_id);
	//
	// 	let isPermitted: boolean = false;
	//
	// 	if (role) if (role.name === 'admin') isPermitted = true;
	//
	// 	if (isPermitted) {
	// 		await BookRepository.delete(id);
	//
	// 		res.sendStatus(200);
	// 	} else {
	// 		res.sendStatus(400);
	// 	}
	// }
}

export default BooksController;
