import fs from 'fs';
import path from 'path';
import { OkPacket } from 'mysql2';

import { Book, BookRepository } from '../models/book.model';
import { Author, AuthorRepository } from '../models/author.model';
import { BookGenre, BookGenreRepository } from '../models/book_genre.model';
import { Genre, GenreRepository } from '../models/genre.model';

import BookDto from '../controllers/books/dto/book.dto';
import BookFiltersDto from '../controllers/books/dto/book_filters.dto';
import CreateBookDto from '../controllers/books/dto/create_book.dto';
import UpdateBookDto from '../controllers/books/dto/update_book.dto';

import BookValidator from '../validators/book.validator';
import { STATIC_DIR } from '../configs/multer.config';

class BooksService {
	public static async find(
		booksFilters: BookFiltersDto | undefined
	): Promise<BookDto[] | never> {
		await BookValidator.validateGettingAll(booksFilters);

		let books: Book[] = await BookRepository.getAll();

		if (booksFilters) {
			const { searchTitle, searchAuthorFullName, searchGenresIds } = booksFilters;

			books = await this.filter(
				books,
				searchTitle,
				searchAuthorFullName,
				searchGenresIds
			);
		}

		const booksDto: BookDto[] = [];
		for (const book of books) {
			const bookDto: BookDto = await this.parseToDto(book);
			booksDto.push(bookDto);
		}

		return booksDto;
	}

	public static async findOne(id: string | undefined): Promise<BookDto | never> {
		const book = await BookValidator.validateGetting(id);
		return await this.parseToDto(book);
	}

	public static async create(
		createBookDto: CreateBookDto | undefined,
		files: { [key: string]: Express.Multer.File[] } | undefined
	): Promise<BookDto> {
		const validationResult = await BookValidator.validateCreating(
			createBookDto,
			files
		);

		const { imageFile, bookFile } = validationResult;

		// createBookDto is valid
		createBookDto = createBookDto as CreateBookDto;
		const { authorId, title, description, genreIds } = createBookDto;

		const okPacket: OkPacket = await BookRepository.create(
			authorId,
			title,
			description,
			imageFile,
			bookFile
		);

		const newBook: Book | undefined = await BookRepository.get(okPacket.insertId);

		if (!newBook) throw new Error('Book creation is failed');

		/* Add Genre Connections */
		for (const genreId of genreIds) {
			await BookGenreRepository.create(newBook.id, genreId);
		}

		return await this.parseToDto(newBook);
	}

	public static async update(
		id: string | undefined,
		updateBookDto: UpdateBookDto | undefined,
		files: { [key: string]: Express.Multer.File[] } | undefined
	): Promise<void | never> {
		const validationResult = await BookValidator.validateUpdating(
			id,
			updateBookDto,
			files
		);

		const { newImageFile, newBookFile } = validationResult;
		let { book } = validationResult;

		updateBookDto = updateBookDto as UpdateBookDto;
		const {
			authorId: newAuthorId,
			title: newTitle,
			description: newDescription,
			genreIds: newGenreIds,
		} = updateBookDto;

		if (newAuthorId) {
			await this.updateAuthor(book, newAuthorId);
			book = (await BookRepository.get(book.id)) as Book;
		}
		if (newTitle) {
			await this.updateTitle(book, newTitle);
			book = (await BookRepository.get(book.id)) as Book;
		}

		if (newDescription) {
			await this.updateDescription(book, newDescription);
			book = (await BookRepository.get(book.id)) as Book;
		}
		if (newImageFile) {
			await this.updateImageFile(book, newImageFile);
			book = (await BookRepository.get(book.id)) as Book;
		}
		if (newBookFile) {
			await this.updateBookFile(book, newBookFile);
			book = (await BookRepository.get(book.id)) as Book;
		}
		if (newGenreIds) {
			await this.updateGenres(book, newGenreIds);
		}
	}

	public static async delete(id: string | undefined) {
		const book: Book = await BookValidator.validateDeleting(id);
		await BookRepository.delete(book.id);
		fs.rmSync(path.join(STATIC_DIR, book.image_file));
		fs.rmSync(path.join(STATIC_DIR, book.book_file));
	}

	private static async filter(
		books: Book[],
		title?: string,
		authorFullName?: string,
		genresIds?: number[]
	): Promise<Book[] | never> {
		if (title) {
			books = await this.filterByTitle(books, title);
		}

		if (authorFullName) {
			books = await this.filterByAuthor(books, authorFullName);
		}

		if (genresIds) {
			books = await this.filterByGenres(books, genresIds);
		}

		return books;
	}

	private static async filterByTitle(books: Book[], title: string): Promise<Book[]> {
		books = books.filter((book) => {
			const regExp = new RegExp(title, 'i');
			return regExp.test(book.title);
		});

		return books;
	}

	private static async filterByAuthor(
		books: Book[],
		authorFullName: string
	): Promise<Book[]> {
		const booksFiltered: Book[] = [];
		for (const book of books) {
			const author: Author | undefined = await AuthorRepository.get(book.author_id);
			if (author) {
				const regExp = new RegExp(authorFullName, 'i');
				const res: boolean = regExp.test(author.full_name);
				if (res) booksFiltered.push(book);
			}
		}

		return booksFiltered;
	}

	private static async filterByGenres(
		books: Book[],
		searchGenresIds: number[]
	): Promise<Book[]> {
		books = books.filter(async (book) => {
			const booksGenresAll: BookGenre[] = await BookGenreRepository.getAll();
			const bookGenresIds = booksGenresAll
				.filter((bookGenre) => bookGenre.book_id === book.id)
				.map((bookGenre) => bookGenre.genre_id);

			const intersection = searchGenresIds.filter((genreId) => {
				bookGenresIds.includes(genreId);
			});

			return intersection.length === searchGenresIds.length;
		});

		return books;
	}

	private static async updateAuthor(book: Book, newAuthorId: number) {
		await BookRepository.update(
			newAuthorId,
			book.title,
			book.description,
			book.image_file,
			book.book_file,
			book.id
		);
	}

	private static async updateTitle(book: Book, newTitle: string) {
		await BookRepository.update(
			book.author_id,
			newTitle,
			book.description,
			book.image_file,
			book.book_file,
			book.id
		);
	}

	private static async updateDescription(book: Book, newDescription: string) {
		await BookRepository.update(
			book.author_id,
			book.title,
			newDescription,
			book.image_file,
			book.book_file,
			book.id
		);
	}

	private static async updateImageFile(book: Book, newImageFile: string) {
		//delete old image file
		fs.rmSync(path.join(STATIC_DIR, book.image_file));
		await BookRepository.update(
			book.author_id,
			book.title,
			book.description,
			newImageFile,
			book.book_file,
			book.id
		);
	}

	private static async updateBookFile(book: Book, newBookFile: string) {
		//delete old book file
		fs.rmSync(path.join(STATIC_DIR, book.book_file));
		await BookRepository.update(
			book.author_id,
			book.title,
			book.description,
			book.image_file,
			newBookFile,
			book.id
		);
	}

	private static async updateGenres(book: Book, newGenreIds: number[]) {
		// get genres ids only for book
		let bookGenreIds: number[] = (await BookGenreRepository.getAll())
			.filter((bookGenre) => bookGenre.book_id === book.id)
			.map((bookGenre) => bookGenre.genre_id);

		// delete extra genres from book
		for (const genreId of bookGenreIds) {
			if (!newGenreIds.includes(genreId)) {
				await BookGenreRepository.delete(book.id, genreId);
			}
		}

		// get updated genres ids
		bookGenreIds = (await BookGenreRepository.getAll())
			.filter((bookGenre) => book.id === bookGenre.book_id)
			.map((bookGenre) => bookGenre.genre_id);

		// add new genres to book
		for (const genreId of newGenreIds) {
			if (!bookGenreIds.includes(genreId)) {
				await BookGenreRepository.create(book.id, genreId);
			}
		}
	}

	private static async parseToDto(book: Book): Promise<BookDto> {
		const bookDto = {} as BookDto;

		bookDto.id = book.id;
		bookDto.title = book.title;
		bookDto.description = book.description;
		bookDto.imageFile = book.image_file;
		bookDto.bookFile = book.book_file;
		bookDto.createdAt = book.created_at;

		const author = (await AuthorRepository.get(book.author_id)) as Author;

		bookDto.author = {} as { id: number; fullName: string };
		bookDto.author.id = author.id;
		bookDto.author.fullName = author.full_name;

		const booksGenresAll: BookGenre[] = await BookGenreRepository.getAll();

		const bookGenresIds: number[] = booksGenresAll
			.filter((bookGenre) => bookGenre.book_id === bookDto.id)
			.map((bookGenre) => bookGenre.genre_id);

		const genres: Genre[] = [];

		for (let k = 0; k < bookGenresIds.length; ++k) {
			const genre = (await GenreRepository.get(bookGenresIds[k])) as Genre;
			genres.push(genre);
		}
		bookDto.genres = genres;

		return bookDto;
	}
}

export default BooksService;
