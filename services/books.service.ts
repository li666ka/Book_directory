import fs from 'fs';
import path from 'path';
import { OkPacket } from 'mysql2';

import { Book, BookRepository } from '../models/book.model';
import { Author, AuthorRepository } from '../models/author.model';
import { BookGenre, BookGenreRepository } from '../models/book_genre.model';
import { Genre, GenreRepository } from '../models/genre.model';

import BookDto from '../controllers/books/dto/book.dto';
import BooksFiltersDto from '../controllers/books/dto/books_filters.dto';
import CreateBookDto from '../controllers/books/dto/create_book.dto';
import UpdateBookDto from '../controllers/books/dto/update_book.dto';

import BookValidator from '../validation/book.validation';

class BooksService {
	public static async find(
		booksFilters: BooksFiltersDto | undefined
	): Promise<BookDto[] | never> {
		await BookValidator.validateGetting(booksFilters);

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
		for (let i = 0; i < books.length; ++i) {
			const bookDto: BookDto = await this.parseToDto(books[i]);
			booksDto.push(bookDto);
		}

		return booksDto;
	}

	public static async findOne(id: number | undefined): Promise<BookDto | never> {
		if (!id) throw new Error('id is undefined');

		const book: Book | undefined = await BookRepository.get(id);
		if (!book) throw new Error(`Book with id ${id} does not exist`);

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

		const { author, imageFile, bookFile } = validationResult;

		// createBookDto is valid
		createBookDto = createBookDto as CreateBookDto;
		const { authorId, title, description, genresIds } = createBookDto;

		const imgUrl: string = this.moveNewFileAndGetUrl(
			imageFile,
			author.full_name,
			title
		);
		const url: string = this.moveNewFileAndGetUrl(bookFile, author.full_name, title);

		const okPacket: OkPacket = await BookRepository.create(
			authorId,
			title,
			imgUrl,
			description,
			url
		);

		const newBook: Book | undefined = await BookRepository.get(okPacket.insertId);

		if (!newBook) throw new Error('Book creation is failed');

		/* Add Genres Connections */
		for (let i = 0; i < genresIds.length; ++i) {
			const genreId: number = genresIds[i];

			await BookGenreRepository.create(newBook.id, genreId);
		}

		return await this.parseToDto(newBook);
	}

	public static async update(
		id: string | undefined,
		updateBookDto: UpdateBookDto | undefined,
		files: { [key: string]: Express.Multer.File[] } | undefined
	): Promise<void> {
		const validationResult = await BookValidator.validateUpdating(
			id,
			updateBookDto,
			files
		);

		const { newAuthor, newImageFile, newBookFile } = validationResult;
		let { book } = validationResult;

		updateBookDto = updateBookDto as UpdateBookDto;
		const {
			authorId: newAuthorId,
			title: newTitle,
			description: newDescription,
			genresIds: newGenresIds,
		} = updateBookDto;

		if (newAuthor) {
			await this.updateAuthor(book, newAuthor);
			book = (await BookRepository.get(book.id)) as Book;
		}

		if (newTitle) {
			await this.updateTitle(book, newTitle);
			book = (await BookRepository.get(book.id)) as Book;
		}

		if (newDescription) await this.updateDescription(book, newDescription);
		if (newImageFile) await this.updateImageFile(book, newImageFile);
		if (newBookFile) await this.updateBookFile(book, newImageFile);
		if (newGenresIds) await this.updateGenres(book, newGenresIds);
	}

	public static async delete(id: string | undefined) {
		const book: Book = await BookValidator.validateDeleting(id);
		await BookRepository.delete(book.id);
		fs.rmSync(path.join('content', path.dirname(book.url)), {
			recursive: true,
			force: true,
		});
	}

	/**
	 * Moves book folder (image file + book file)
	 * from old author folder to new author folder,
	 * updates author_id in 'books' table.
	 */
	private static async updateAuthor(book: Book, newAuthor: Author) {
		const newAuthorFolder: string = this.formatStringForFs(newAuthor.full_name);
		const bookFolder: string = this.formatStringForFs(book.title);

		// content/OLD_author_full_name/book_title
		const bookFolderOldPath: string = path.join('content', path.dirname(book.url));

		// content/NEW_author_full_name/book_title
		const bookFolderNewPath: string = path.join(
			'content',
			newAuthorFolder,
			bookFolder
		);

		fs.renameSync(bookFolderOldPath, bookFolderNewPath);

		await BookRepository.update(
			newAuthor.id,
			book.title,
			book.img_url,
			book.description,
			book.url,
			book.id
		);
	}

	/**
	 * Renames book folder, image file and book file.
	 * Updates title, image_url and url in 'books' table.
	 *
	 * Returns updated book.
	 */
	private static async updateTitle(book: Book, newTitle: string) {
		const [authorFolder, oldBookFolder] = book.url.split(path.sep);
		const newBookFolder = this.formatStringForFs(newTitle);

		// content/author_full_name/OLD_book_title
		const folderOldPath: string = path.join('content', authorFolder, oldBookFolder);

		// content/author_full_name/NEW_book_title
		const folderNewPath: string = path.join('content', authorFolder, newBookFolder);

		fs.renameSync(folderOldPath, folderNewPath);

		// rename files
		const bookOldPath: string = path.join(folderNewPath, path.basename(book.url));
		const bookNewPath: string = path.join(
			folderNewPath,
			this.formatStringForFs(newTitle) + path.extname(book.url)
		);

		fs.renameSync(bookOldPath, bookNewPath);

		const imageOldPath: string = path.join(
			folderNewPath,
			path.basename(book.img_url)
		);
		const imageNewPath: string = path.join(
			folderNewPath,
			this.formatStringForFs(newTitle) + path.extname(book.img_url)
		);

		fs.renameSync(imageOldPath, imageNewPath);

		const newImgUrl = path.join(
			authorFolder,
			newBookFolder,
			path.basename(imageNewPath)
		);
		const newUrl = path.join(authorFolder, newBookFolder, path.basename(bookNewPath));

		await BookRepository.update(
			book.author_id,
			newTitle,
			newImgUrl,
			book.description,
			newUrl,
			book.id
		);
	}

	private static async updateDescription(book: Book, newDescription: string) {
		await BookRepository.update(
			book.author_id,
			book.title,
			book.img_url,
			newDescription,
			book.url,
			book.id
		);
	}

	/**
	 * Deletes old image file,
	 * moves new image file to book folder
	 * (img_url stays the same).
	 */
	private static async updateImageFile(book: Book, newImageFile: Express.Multer.File) {
		//delete old image file
		fs.rmSync(path.join('content', book.img_url));

		const [authorFolder] = book.img_url.split(path.sep);
		this.moveNewFileAndGetUrl(newImageFile, authorFolder, book.title);
	}

	/**
	 * Deletes old book file,
	 * moves new book file to book folder
	 * (url stays the same).
	 */
	private static async updateBookFile(book: Book, newBookFile: Express.Multer.File) {
		//delete old book file
		fs.rmSync(path.join('content', book.url));

		const [authorFolder] = book.url.split(path.sep);
		this.moveNewFileAndGetUrl(newBookFile, authorFolder, book.title);
	}

	private static async updateGenres(book: Book, newGenres: number[]) {
		// get genres ids only for book
		let bookGenres: number[] = (await BookGenreRepository.getAll())
			.filter((bookGenre) => bookGenre.book_id === book.id)
			.map((bookGenre) => bookGenre.genre_id);

		// delete extra genres from book
		for (const genreId of bookGenres) {
			if (!newGenres.includes(genreId)) {
				await BookGenreRepository.delete(book.id, genreId);
			}
		}

		// get updated genres ids
		bookGenres = (await BookGenreRepository.getAll())
			.filter((bookGenre) => book.id === bookGenre.book_id)
			.map((bookGenre) => bookGenre.genre_id);

		// add new genres to book
		for (const genreId of newGenres) {
			if (!bookGenres.includes(genreId)) {
				await BookGenreRepository.create(book.id, genreId);
			}
		}
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
			const regExp = new RegExp(title);
			return regExp.test(book.title);
		});

		return books;
	}

	private static async filterByAuthor(
		books: Book[],
		authorFullName: string
	): Promise<Book[]> {
		books = books.filter(async (book) => {
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

	private static async parseToDto(book: Book): Promise<BookDto> {
		const bookDto = {} as BookDto;

		bookDto.id = book.id;
		bookDto.title = book.title;
		bookDto.imgUrl = book.img_url;
		bookDto.description = book.description;
		bookDto.url = book.url;
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

	private static moveNewFileAndGetUrl(
		file: Express.Multer.File,
		authorFullName: string,
		bookTitle: string
	): string {
		const authorFolder: string = authorFullName.replaceAll(' ', '_');
		const bookFolder: string = bookTitle.replaceAll(' ', '_');

		const newFilename: string = bookFolder + path.extname(file.originalname);

		const fileOldPath: string = file.path;
		const fileNewPath: string = path.join(
			'content',
			authorFolder,
			bookFolder,
			newFilename
		);

		const bookDir: string = path.join('content', authorFolder, bookFolder);

		if (!fs.existsSync(bookDir)) fs.mkdirSync(bookDir);

		fs.renameSync(fileOldPath, fileNewPath);

		return path.join(authorFolder, bookFolder, newFilename);
	}

	private static formatStringForFs(str: string) {
		return str.replaceAll(' ', '_');
	}
}

export default BooksService;
