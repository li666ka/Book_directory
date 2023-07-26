import BookFiltersDto from '../../controllers/books/dto/book_filters.dto';
import UpdateBookDto from '../../controllers/books/dto/update_book.dto';
import CreateBookDto from '../../controllers/books/dto/create_book.dto';

import { Book, BookRepository } from '../../models/book.model';
import { Author, AuthorRepository } from '../../models/author.model';
import { Genre, GenreRepository } from '../../models/genre.model';

class BookValidator {
	/**
	 * Validates BookFiltersDto object.
	 * Changes BookFiltersDto object (parse searchGenreIds to number[]).
	 * @param booksFiltersDto
	 */
	public static async validateGettingAll(
		booksFiltersDto: BookFiltersDto
	): Promise<void> {
		if (!booksFiltersDto) return;

		booksFiltersDto.searchGenreIds = booksFiltersDto.searchGenreIds
			? booksFiltersDto.searchGenreIds.map((genreId) =>
					parseInt(String(genreId), 10)
			  )
			: undefined;

		const { searchGenreIds } = booksFiltersDto;

		if (!searchGenreIds) return;

		for (const searchGenreId of searchGenreIds) {
			if (isNaN(searchGenreId)) throw new Error('Incorrect genreId');
			const genre: Genre | undefined = await GenreRepository.get(searchGenreId);
			if (!genre) throw new Error(`Genre with id ${searchGenreId} does not exist`);
		}
	}

	/**
	 * Validates input id.
	 * @param id
	 * Returns Book object by input id.
	 */
	public static async validateGetting(id: string): Promise<Book> {
		const idParsed: number = parseInt(id, 10);
		if (isNaN(idParsed)) throw new Error('id is invalid');

		const book: Book | undefined = await BookRepository.get(idParsed);
		if (!book) throw new Error(`Book with id ${id} does not exist`);

		return book;
	}

	/**
	 * Validates CreateBookDto object and multer files.
	 * Changes CreateBookDto object (parse genreIds to number[] and authorId to number).
	 * @param createBookDto
	 * @param files
	 * Returns object with multer book filenames or throws Error.
	 */
	public static async validateCreating(
		createBookDto: CreateBookDto,
		files: { [key: string]: Express.Multer.File[] }
	): Promise<{
		imageFile: string;
		bookFile: string;
	}> {
		const { authorId, genreIds } = createBookDto;

		if (genreIds.size === 0) throw new Error('genresIds is empty');

		for (const genreId of genreIds) {
			const genre: Genre | undefined = await GenreRepository.get(genreId);
			if (!genre) throw new Error(`Genre with id ${genreId} does not exist`);
		}

		const imageFile: string | undefined = files['book-image']
			? files['book-image'][0].filename
			: undefined;
		const bookFile: string | undefined = files['book-file']
			? files['book-file'][0].filename
			: undefined;

		if (!imageFile) throw new Error('image file is undefined');
		if (!bookFile) throw new Error('book file is undefined');

		const author: Author | undefined = await AuthorRepository.get(authorId);
		if (!author) throw new Error(`Author with id ${authorId} does not exist`);

		return { imageFile, bookFile };
	}

	/**
	 * Validates UpdateBookDto object and multer files.
	 * Changes CreateBookDto object (parse genreIds to number[] and authorId to number).
	 * @param id
	 * @param updateBookDto
	 * @param files
	 */
	public static async validateUpdating(
		id: string,
		updateBookDto: UpdateBookDto,
		files: { [key: string]: Express.Multer.File[] }
	): Promise<{
		book: Book;
		newImageFile?: string;
		newBookFile?: string;
	}> {
		const idParsed: number = parseInt(id, 10);

		const { authorId, title, description, genreIds } = updateBookDto;
		const imageFile: string | undefined = files['book-image']
			? files['book-image'][0].filename
			: undefined;
		const bookFile: string | undefined = files['book-file']
			? files['book-file'][0].filename
			: undefined;

		if (!(authorId || title || description || genreIds || imageFile || bookFile))
			throw new Error('No properties for updating');

		if (genreIds) {
			for (const genreId of genreIds) {
				const genre: Genre | undefined = await GenreRepository.get(genreId);
				if (!genre) throw new Error(`Genre with id ${genreId} does not exist`);
			}
		}

		let author: Author | undefined = undefined;
		if (authorId) {
			author = await AuthorRepository.get(authorId);
			if (!author) throw new Error(`Author with id ${authorId} does not exist`);
		}

		const book: Book | undefined = await BookRepository.get(idParsed);

		if (!book) throw new Error(`Book with id ${idParsed} does not exist`);

		return {
			book,
			newImageFile: imageFile,
			newBookFile: bookFile,
		};
	}

	/**
	 * Validates input id.
	 * @param id
	 * Returns Book object by input id.
	 */
	public static async validateDeleting(id: string): Promise<Book> {
		const idParsed: number = parseInt(id, 10);

		const book: Book | undefined = await BookRepository.get(idParsed);

		if (!book) throw new Error(`Book with id ${id} does not exist`);

		return book;
	}
}

export default BookValidator;
