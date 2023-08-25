import { Book } from '../../models/book.model';
import { Author } from '../../models/author.model';
import { Genre } from '../../models/genre.model';
import { BookFiltersDtoParsed } from '../../types/dto-parsed.types';
import { CreateBookDto } from '../../controllers/books/dto/create-book.dto';

import { UpdateBookDto } from '../../controllers/books/dto/update-book.dto';
import { AppError, HttpCode } from '../../exceptions/app-error';
import GenresService from '../../services/genres.service';
import BooksService from '../../services/books.service';
import AuthorsService from '../../services/authors.service';

class BooksDataValidator {
	/**
	 * Validates BookFiltersDto object.
	 * Changes BookFiltersDto object (parse searchGenreIds to number[]).
	 * @param booksFiltersDto
	 */
	public static validateGettingAll(booksFiltersDto: BookFiltersDtoParsed) {
		if (!booksFiltersDto) return;

		const { searchGenreIds } = booksFiltersDto;

		if (!searchGenreIds) return;

		for (const searchGenreId of searchGenreIds) {
			const genre: Genre | undefined = GenresService.getById(searchGenreId);
			if (!genre)
				throw new AppError(
					HttpCode.BAD_REQUEST,
					`Genre with id ${searchGenreId} does not exist`
				);
		}
	}

	/**
	 * Validates input id.
	 * @param id
	 * Returns Book object by input id.
	 */
	public static validateGetting(id: number): Book {
		const book: Book | undefined = BooksService.getById(id);
		if (!book)
			throw new AppError(HttpCode.BAD_REQUEST, `Book with id ${id} does not exist`);
		return book;
	}

	/**
	 * Validates CreateBookDto object and multer files.
	 * Changes CreateBookDto object (parse genreIds to number[] and authorId to number).
	 * @param createBookDto
	 * Returns object with multer book filenames or throws Error.
	 */
	public static validateCreating(createBookDto: CreateBookDto) {
		const { authorId, genreIds, title } = createBookDto;

		const authorBookWithSameTitle = BooksService.getByTitle(title).find(
			(book) => book.author_id === authorId
		);

		if (authorBookWithSameTitle)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Book with title ${title} already exists`
			);

		if (genreIds.size === 0)
			throw new AppError(HttpCode.BAD_REQUEST, 'genresIds is empty');

		for (const genreId of genreIds) {
			const genre: Genre | undefined = GenresService.getById(genreId);
			if (!genre)
				throw new AppError(
					HttpCode.BAD_REQUEST,
					`Genre with id ${genreId} does not exist`
				);
		}

		const author: Author | undefined = AuthorsService.getById(authorId);
		if (!author)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Author with id ${authorId} does not exist`
			);
	}

	/**
	 * Validates UpdateBookDto object and multer files.
	 * Changes CreateBookDto object (parse genreIds to number[] and authorId to number).
	 * @param id
	 * @param updateBookDto
	 */
	public static validateUpdating(
		id: number,
		updateBookDto: UpdateBookDto
	): { book: Book } {
		const { authorId, genreIds } = updateBookDto;
		if (genreIds) {
			for (const genreId of genreIds) {
				const genre: Genre | undefined = GenresService.getById(genreId);
				if (!genre)
					throw new AppError(
						HttpCode.BAD_REQUEST,
						`Genre with id ${genreId} does not exist`
					);
			}
		}
		let author: Author | undefined = undefined;
		if (authorId) {
			author = AuthorsService.getById(authorId);
			if (!author)
				throw new AppError(
					HttpCode.BAD_REQUEST,
					`Author with id ${authorId} does not exist`
				);
		}

		const book: Book | undefined = BooksService.getById(id);

		if (!book)
			throw new AppError(HttpCode.BAD_REQUEST, `Book with id ${id} does not exist`);

		return { book };
	}

	/**
	 * Validates input id.
	 * @param id
	 * Returns Book object by input id.
	 */
	public static validateDeleting(id: number): Book {
		const book: Book | undefined = BooksService.getById(id);
		if (!book) {
			throw new AppError(HttpCode.BAD_REQUEST, `Book with id ${id} does not exist`);
		}
		return book;
	}
}

export default BooksDataValidator;
