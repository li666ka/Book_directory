import BooksFiltersDto from '../controllers/books/dto/books_filters.dto';
import UpdateBookDto from '../controllers/books/dto/update_book.dto';
import CreateBookDto from '../controllers/books/dto/create_book.dto';

import { Author, AuthorRepository } from '../models/author.model';
import { Genre, GenreRepository } from '../models/genre.model';
import { Book, BookRepository } from '../models/book.model';

class BookValidator {
	public static async validateGettingAll(
		booksFilters: BooksFiltersDto | undefined
	): Promise<void | never> {
		if (!booksFilters) return;

		const { searchGenresIds } = booksFilters;

		if (!searchGenresIds) return;

		for (let i = 0; i < searchGenresIds.length; ++i) {
			const genre: Genre | undefined = await GenreRepository.get(
				searchGenresIds[i]
			);

			if (!genre)
				throw new Error(`Genre with id ${searchGenresIds[i]} does not exist`);
		}
	}

	public static async validateGetting(id: string | undefined): Promise<Book | never> {
		if (!id) throw new Error('id is undefined');

		const parsedId: number = +id;
		if (isNaN(parsedId)) throw new Error('id is invalid');

		const book: Book | undefined = await BookRepository.get(parsedId);
		if (!book) throw new Error(`Book with id ${id} does not exist`);

		return book;
	}

	public static async validateCreating(
		createBookDto: CreateBookDto | undefined,
		files: { [key: string]: Express.Multer.File[] } | undefined
	): Promise<
		| {
				author: Author;
				imageFile: Express.Multer.File;
				bookFile: Express.Multer.File;
		  }
		| never
	> {
		if (!createBookDto) throw new Error('Dto is empty');

		const { authorId, title, description, genresIds } = createBookDto;

		if (!authorId) throw new Error('authorId is undefined');
		if (!title) throw new Error('title is undefined');
		if (!description) throw new Error('description is undefined');
		if (!genresIds) throw new Error('genresIds is undefined');
		if (genresIds.length === 0) throw new Error('genresIds is empty');

		for (let i = 0; i < genresIds.length; ++i) {
			const genreId: number = genresIds[i];
			const genre: Genre | undefined = await GenreRepository.get(genreId);

			if (!genre) throw new Error(`Genre with id ${genreId} does not exist`);
		}

		if (!files) throw new Error('Files is empty');

		const imageFile: Express.Multer.File | undefined = files
			? files['book-image']
				? files['book-image'][0]
				: undefined
			: undefined;
		const bookFile: Express.Multer.File | undefined = files
			? files['book-file']
				? files['book-file'][0]
				: undefined
			: undefined;

		if (!imageFile) throw new Error('image file is undefined');
		if (!bookFile) throw new Error('book file is undefined');

		const author: Author | undefined = await AuthorRepository.get(authorId);
		if (!author) throw new Error(`Author with id ${authorId} does not exist`);

		return { author, imageFile, bookFile };
	}

	public static async validateUpdating(
		id: string | undefined,
		updateBookDto: UpdateBookDto | undefined,
		files: { [key: string]: Express.Multer.File[] } | undefined
	): Promise<{
		book: Book;
		newAuthor?: Author;
		newImageFile?: Express.Multer.File;
		newBookFile?: Express.Multer.File;
	}> {
		if (!id) throw new Error('id is undefined');

		const idParsed: number = +id;
		if (isNaN(idParsed)) throw new Error('id is invalid');

		if (!updateBookDto) throw new Error('Dto is undefined');

		const { authorId, title, description, genresIds } = updateBookDto;
		const imageFile: Express.Multer.File | undefined = files
			? files['book-image']
				? files['book-image'][0]
				: undefined
			: undefined;
		const bookFile: Express.Multer.File | undefined = files
			? files['book-file']
				? files['book-file'][0]
				: undefined
			: undefined;

		if (!(authorId || title || description || genresIds || imageFile || bookFile))
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
			newAuthor: author,
			newImageFile: imageFile,
			newBookFile: bookFile,
		};
	}

	public static async validateDeleting(id: string | undefined): Promise<Book | never> {
		const idParsed: number = +id;
		if (isNaN(idParsed)) throw new Error('id is invalid');

		const book: Book | undefined = await BookRepository.get(idParsed);

		if (!book) throw new Error(`Book with id ${id} does not exist`);

		return book;
	}
}

export default BookValidator;
