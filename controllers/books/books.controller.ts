import { Request, Response } from 'express';

import BooksService from '../../services/books.service';
import { parseBookFiltersDto, parseId } from '../../utils/parsing.util';
import { BookFiltersDtoParsed } from '../../types/dto_parsed.types';
import { HttpCode } from '../../exceptions/app_error';
import { BookFiltersDto } from './dto/book_filters.dto';
import { BookDto } from './dto/book.dto';
import { BookDetailsDto } from './dto/book_details.dto';
import { CreateBookDto } from './dto/create_book.dto';
import { UpdateBookDto } from './dto/update_book.dto';

class BooksController {
	public static async getAll(
		req: Request<never, never, never, BookFiltersDto | undefined>,
		res: Response<BookDto[]>
	) {
		const { query } = req;
		console.log(query);

		const bookFiltersParsed = query ? parseBookFiltersDto(query) : undefined;

		const books: BookDto[] = await BooksService.find(bookFiltersParsed);
		res.json(books);
	}

	public static async get(req: Request<{ id: string }>, res: Response<BookDetailsDto>) {
		const { id } = req.params;
		const idParsed = parseId(id);
		const book: BookDetailsDto = await BooksService.findOne(idParsed);
		res.json(book);
	}

	public static async create(
		req: Request<never, never, CreateBookDto>,
		res: Response<BookDto>
	) {
		const { body } = req;
		const newBook: BookDto = await BooksService.create(body);
		res.status(HttpCode.CREATED).json(newBook);
	}

	public static async update(
		req: Request<{ id: string }, never, UpdateBookDto>,
		res: Response
	) {
		const { id } = req.params;
		const { body } = req;
		const idParsed = parseId(id);
		await BooksService.update(idParsed, body);
		res.sendStatus(HttpCode.OK);
	}

	public static async uploadFile(req: Request<{ id: string }>, res: Response) {
		const { id } = req.params;
		let { file } = req;

		const idParsed = parseId(id);
		file = file as Express.Multer.File;

		await BooksService.uploadImage(idParsed, file);
		res.sendStatus(HttpCode.CREATED);
	}

	public static async uploadImage(req: Request<{ id: string }>, res: Response) {
		const { id } = req.params;
		let { file } = req;

		const idParsed = parseId(id);
		file = file as Express.Multer.File;

		await BooksService.uploadFile(idParsed, file);
		res.sendStatus(HttpCode.CREATED);
	}

	public static async delete(req: Request<{ id: string }>, res: Response) {
		const { id } = req.params;
		const idParsed = parseId(id);
		await BooksService.delete(idParsed);
		res.sendStatus(HttpCode.OK);
	}
}

export default BooksController;
