import { Book, BookRepository } from '../../models/book.model';
import { Author, AuthorRepository } from '../../models/author.model';
import { Genre, GenreRepository } from '../../models/genre.model';
import { BookFiltersDtoParsed } from '../../types/dto-parsed.types';
import { CreateBookDto } from '../../controllers/books/dto/create-book.dto';

import { UpdateBookDto } from '../../controllers/books/dto/update-book.dto';
import { AppError, HttpCode } from '../../exceptions/app-error';
import { BOOK_FILE_FIELD, BOOK_IMAGE_FIELD } from '../../utils/multer.util';

class BooksDataValidator {
	/**
	 * Validates BookFiltersDto object.
	 * Changes BookFiltersDto object (parse searchGenreIds to number[]).
	 * @param booksFiltersDto
	 */
	public static async validateGettingAll(booksFiltersDto: BookFiltersDtoParsed) {
		if (!booksFiltersDto) return;

		const { searchGenreIds } = booksFiltersDto;

		if (!searchGenreIds) return;

		for (const searchGenreId of searchGenreIds) {
			const genre: Genre | undefined = await GenreRepository.get(searchGenreId);
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
	public static async validateGetting(id: number): Promise<Book> {
		const book: Book | undefined = await BookRepository.get(id);
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
	public static async validateCreating(createBookDto: CreateBookDto) {
		const { authorId, genreIds, title } = createBookDto;

		const authorBookWithSameTitle = (await BookRepository.getAll())
			.filter((book) => book.author_id === authorId)
			.find((book) => book.title === title);

		if (authorBookWithSameTitle)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Book with title ${title} already exists`
			);

		if (genreIds.size === 0)
			throw new AppError(HttpCode.BAD_REQUEST, 'genresIds is empty');

		for (const genreId of genreIds) {
			const genre: Genre | undefined = await GenreRepository.get(genreId);
			if (!genre)
				throw new AppError(
					HttpCode.BAD_REQUEST,
					`Genre with id ${genreId} does not exist`
				);
		}

		const author: Author | undefined = await AuthorRepository.get(authorId);
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
	public static async validateUpdating(
		id: number,
		updateBookDto: UpdateBookDto
	): Promise<{
		book: Book;
	}> {
		const { authorId, genreIds } = updateBookDto;
		if (genreIds) {
			for (const genreId of genreIds) {
				const genre: Genre | undefined = await GenreRepository.get(genreId);
				if (!genre)
					throw new AppError(
						HttpCode.BAD_REQUEST,
						`Genre with id ${genreId} does not exist`
					);
			}
		}
		let author: Author | undefined = undefined;
		if (authorId) {
			author = await AuthorRepository.get(authorId);
			if (!author)
				throw new AppError(
					HttpCode.BAD_REQUEST,
					`Author with id ${authorId} does not exist`
				);
		}

		const book: Book | undefined = await BookRepository.get(id);

		if (!book)
			throw new AppError(HttpCode.BAD_REQUEST, `Book with id ${id} does not exist`);

		return { book };
	}

	/**
	 * Validates input id.
	 * @param id
	 * Returns Book object by input id.
	 */
	public static async validateDeleting(id: number): Promise<Book> {
		const book: Book | undefined = await BookRepository.get(id);
		if (!book)
			throw new AppError(HttpCode.BAD_REQUEST, `Book with id ${id} does not exist`);
		return book;
	}
}

export default BooksDataValidator;
