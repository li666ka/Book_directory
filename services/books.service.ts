import fs from 'fs';
import path from 'path';
import { OkPacket } from 'mysql2';

import { Book, BookRepository } from '../models/book.model';
import { Author, AuthorRepository } from '../models/author.model';
import { BookGenre, BookGenreRepository } from '../models/book_genre.model';
import { Genre, GenreRepository } from '../models/genre.model';

import GetBooksDto from '../controllers/books/dto/get_books.dto';
import BookDto from '../controllers/books/dto/book.dto';
import CreateBookDto from '../controllers/books/dto/create_book.dto';

import BookValidator from '../validation/book.validation';
import DeleteBookDto from '../controllers/books/dto/delete_book.dto';

class BooksService {
	public static async find(getBooksDto: GetBooksDto): Promise<BookDto[] | never> {
		const { title, authorFullName, genresIds } = getBooksDto;
		const booksAll: Book[] = await BookRepository.getAll();
		const books: Book[] = await this.filter(
			booksAll,
			title,
			authorFullName,
			genresIds
		);

		const booksDto: BookDto[] = [];
		for (let i = 0; i < books.length; ++i) {
			const bookDto: BookDto = await this.toDto(books[i]);
			booksDto.push(bookDto);
		}

		return booksDto;
	}

	public static async findOne(getBookDto: GetBookDto): Promise<BookDto | never> {
		const { id } = getBookDto;

		const book: Book | undefined = await BookRepository.get(id);
		if (!book) throw new Error(`Book with id ${id} does not exist`);

		return await this.toDto(book);
	}

	public static async create(
		createBookDto: CreateBookDto | undefined,
		files:
			| {
					[key: string]: Express.Multer.File[];
			  }
			| Express.Multer.File[]
			| undefined
	): Promise<BookDto | never> {
		const validationResult = await BookValidator.validateCreationData(
			createBookDto,
			files
		);

		const { author, bookFile, imageFile } = validationResult;
		const { authorId, title, description, genresIds } =
			validationResult.createBookDto;

		const authorDir: string = author.full_name.replaceAll(' ', '_');
		const bookDir: string = title.replaceAll(' ', '_');

		const imageNewFilename: string = bookDir + path.extname(imageFile.originalname);
		const bookNewFilename: string = bookDir + path.extname(bookFile.originalname);

		const imageOldPath: string = imageFile.path;
		const imageNewPath: string = path.join(
			'content',
			authorDir,
			bookDir,
			imageNewFilename
		);

		const bookOldPath: string = bookFile.path;
		const bookNewPath: string = path.join(
			'content',
			authorDir,
			bookDir,
			bookNewFilename
		);

		fs.mkdirSync(path.join('content', authorDir, bookDir));

		fs.renameSync(imageOldPath, imageNewPath);
		fs.renameSync(bookOldPath, bookNewPath);

		const imgUrl: string = path.join(authorDir, bookDir, imageNewFilename);
		const url: string = path.join(authorDir, bookDir, bookNewFilename);

		const okPacket: OkPacket = await BookRepository.create(
			authorId,
			title,
			imgUrl,
			description,
			url
		);

		const newBook: Book | undefined = await BookRepository.get(okPacket.insertId);

		if (!newBook) throw new Error('Book creation is failed');

		/* Add Genres */
		for (let i = 0; i < genresIds.length; ++i) {
			const genreId: number = genresIds[i];

			await BookGenreRepository.create(newBook.id, genreId);
		}

		return await this.toDto(newBook);
	}

	public static async delete(deleteBookDto: DeleteBookDto | undefined) {
		const book: Book = await BookValidator.validateDeletingData(deleteBookDto);
		await BookRepository.delete(book.id);
		fs.rmSync(path.join('content', path.dirname(book.url)), {
			recursive: true,
			force: true,
		});
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
			books = await this.filterByAuthorFullName(books, authorFullName);
		}

		if (genresIds) {
			books = await this.filterByGenres(books, genresIds);
		}

		return books;
	}

	private static async filterByTitle(books: Book[], title: string): Promise<Book[]> {
		books = books.filter((book) => {
			const regExp = new RegExp(`${title}`);
			book.title.search(regExp);
		});

		return books;
	}

	private static async filterByAuthorFullName(
		books: Book[],
		authorFullName: string
	): Promise<Book[]> {
		books = await books.filter(async (book) => {
			const author: Author | undefined = await AuthorRepository.get(book.author_id);
			if (author) {
				const regExp = new RegExp(`${authorFullName}`);
				return author.full_name.search(regExp);
			}
		});

		return books;
	}

	private static async filterByGenres(
		books: Book[],
		genresIds: number[]
	): Promise<Book[]> {
		books = await books.filter(async (book) => {
			const booksGenresAll: BookGenre[] = await BookGenreRepository.getAll();
			const booksGenres = booksGenresAll.filter(
				(bookGenre) => bookGenre.book_id === book.id
			);

			booksGenres.forEach((bookGenre) => {
				let exists: boolean = false;
				genresIds.forEach((genreId) => {
					if (bookGenre.genre_id === genreId) {
						exists = true;
						return;
					}
				});
			});
		});

		return books;
	}

	private static async toDto(book: Book): Promise<BookDto> {
		const bookDto = {} as BookDto;

		bookDto.id = book.id;
		bookDto.title = book.title;
		bookDto.imgUrl = book.img_url;
		bookDto.description = book.description;
		bookDto.url = book.url;
		bookDto.createdAt = book.created_at;

		const author: Author | undefined = await AuthorRepository.get(book.author_id);

		if (author) {
			bookDto.author = {} as { id: number; fullName: string };
			bookDto.author.id = author.id;
			bookDto.author.fullName = author.full_name;
		} else {
			throw new Error('author does not exist');
		}

		const booksGenresAll: BookGenre[] = await BookGenreRepository.getAll();

		const bookGenresIds: number[] = booksGenresAll
			.filter((bookGenre) => bookGenre.book_id === bookDto.id)
			.map((bookGenre) => bookGenre.genre_id);

		const genres: Genre[] = [];

		for (let k = 0; k < bookGenresIds.length; ++k) {
			const genre: Genre | undefined = await GenreRepository.get(bookGenresIds[k]);

			if (genre) {
				genres.push(genre);
			} else {
				//err
			}
		}

		bookDto.genres = genres;

		return bookDto;
	}
}

export default BooksService;
