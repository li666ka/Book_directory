import BookFiltersDto from '../controllers/books/dto/book_filters.dto';
import UpdateBookDto from '../controllers/books/dto/update_book.dto';
import CreateBookDto from '../controllers/books/dto/create_book.dto';

import { Author, AuthorRepository } from '../models/author.model';
import { Genre, GenreRepository } from '../models/genre.model';
import { Book, BookRepository } from '../models/book.model';

class BookValidator {
	public static async validateGettingAll(
		booksFilters: BookFiltersDto | undefined
	): Promise<void | never> {
		if (!booksFilters) return;

		booksFilters.searchGenreIds = booksFilters.searchGenreIds
			? booksFilters.searchGenreIds.map((genreId) => parseInt(String(genreId), 10))
			: undefined;

		const { searchGenreIds } = booksFilters;

		if (!searchGenreIds) return;

		for (const searchGenreId of searchGenreIds) {
			const genre: Genre | undefined = await GenreRepository.get(searchGenreId);

			if (!genre) throw new Error(`Genre with id ${searchGenreId} does not exist`);
		}
	}

	public static async validateGetting(id: string): Promise<Book | never> {
		const idParsed: number = parseInt(id, 10);
		if (isNaN(idParsed)) throw new Error('id is invalid');

		const book: Book | undefined = await BookRepository.get(idParsed);
		if (!book) throw new Error(`Book with id ${id} does not exist`);

		return book;
	}

	public static async validateCreating(
		createBookDto: CreateBookDto | undefined,
		files: { [key: string]: Express.Multer.File[] } | undefined
	): Promise<
		| {
				imageFile: string;
				bookFile: string;
		  }
		| never
	> {
		if (!createBookDto) throw new Error('Dto is empty');

		const { authorId, title, description, genreIds } = createBookDto;

		if (!authorId) throw new Error('authorId is undefined');
		if (!title) throw new Error('title is undefined');
		if (!description) throw new Error('description is undefined');
		if (!genreIds) throw new Error('genresIds is undefined');
		if (genreIds.length === 0) throw new Error('genresIds is empty');

		for (const genreId of genreIds) {
			const genre: Genre | undefined = await GenreRepository.get(genreId);
			if (!genre) throw new Error(`Genre with id ${genreId} does not exist`);
		}

		if (!files) throw new Error('Files is empty');

		const imageFile: string | undefined = files
			? files['book-image']
				? files['book-image'][0].filename
				: undefined
			: undefined;
		const bookFile: string | undefined = files
			? files['book-file']
				? files['book-file'][0].filename
				: undefined
			: undefined;

		if (!imageFile) throw new Error('image file is undefined');
		if (!bookFile) throw new Error('book file is undefined');

		const author: Author | undefined = await AuthorRepository.get(authorId);
		if (!author) throw new Error(`Author with id ${authorId} does not exist`);

		return { imageFile, bookFile };
	}

	public static async validateUpdating(
		id: string,
		updateBookDto: UpdateBookDto | undefined,
		files: { [key: string]: Express.Multer.File[] } | undefined
	): Promise<{
		book: Book;
		newImageFile?: string;
		newBookFile?: string;
	}> {
		const idParsed: number = parseInt(id, 10);
		if (isNaN(idParsed)) throw new Error('id is invalid');

		if (!updateBookDto) throw new Error('Dto is undefined');

		const { authorId, title, description, genreIds } = updateBookDto;
		const imageFile: string | undefined = files
			? files['book-image']
				? files['book-image'][0].filename
				: undefined
			: undefined;
		const bookFile: string | undefined = files
			? files['book-file']
				? files['book-file'][0].filename
				: undefined
			: undefined;

		if (!(authorId || title || description || genreIds || imageFile || bookFile))
			throw new Error('No properties for updating');

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

	public static async validateDeleting(id: string): Promise<Book | never> {
		const idParsed: number = +id;
		if (isNaN(idParsed)) throw new Error('id is invalid');

		const book: Book | undefined = await BookRepository.get(idParsed);

		if (!book) throw new Error(`Book with id ${id} does not exist`);

		return book;
	}
}

export default BookValidator;
