import { Request, Response } from 'express';

import BookDto from './dto/book.dto';
import BookFiltersDto from './dto/book_filters.dto';
import CreateBookDto from './dto/create_book.dto';
import UpdateBookDto from './dto/update_book.dto';

import BooksService from '../../services/books.service';
import { Multer } from 'multer';

class BooksController {
	public static async getAll(
		req: Request<never, never, never, BookFiltersDto | undefined>,
		res: Response<BookDto[]>
	) {
		const books: BookDto[] = await BooksService.find(req.query);
		res.json(books);
		return;
	}

	public static async get(req: Request<{ id: string }>, res: Response) {
		try {
			const book: BookDto = await BooksService.findOne(req.params.id);
			res.json(book);
		} catch (err: unknown) {
			res.sendStatus(400);
		}
		return;
	}

	public static async create(
		req: Request<never, never, CreateBookDto>,
		res: Response<BookDto>
	): Promise<void> {
		try {
			req.files = req.files as { [key: string]: Express.Multer.File[] } | undefined;
			const newBook: BookDto = await BooksService.create(req.body, req.files);
			res.status(201).json(newBook);
		} catch (err: unknown) {
			console.log(err.message);
			res.sendStatus(400);
		}
		return;
	}

	public static async update(
		req: Request<{ id: string }, never, UpdateBookDto>,
		res: Response
	): Promise<void> {
		try {
			console.log(req.body);
			req.files = req.files as { [key: string]: Express.Multer.File[] } | undefined;
			await BooksService.update(req.params.id, req.body, req.files);
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
			await BooksService.delete(req.params.id);
			res.sendStatus(200);
		} catch (err: unknown) {
			res.sendStatus(400);
		}
		return;
	}
}

export default BooksController;
