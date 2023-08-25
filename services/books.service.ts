import path from 'path';
import { OkPacket } from 'mysql2';

import { Book, BookRepository } from '../models/book.model';
import { Author, AuthorRepository } from '../models/author.model';
import { BookGenre, BookGenreRepository } from '../models/book-genre.model';
import { GenreRepository } from '../models/genre.model';
import { Review, ReviewRepository } from '../models/review.model';
import { BooklistItem, BooklistItemRepository } from '../models/booklist-item.model';
import { User, UserRepository } from '../models/user.model';

import { BookFiltersDtoParsed } from '../types/dto-parsed.types';

import BooksDataValidator from '../validators/data/books.data.validator';
import { STATIC_DIR } from '../utils/multer.util';

import { BookDto, BookDto_Genre } from '../controllers/books/dto/book.dto';
import { BookDetailsDto } from '../controllers/books/dto/book-details.dto';
import { CreateBookDto } from '../controllers/books/dto/create-book.dto';
import { UpdateBookDto } from '../controllers/books/dto/update-book.dto';

import { deleteFile } from '../utils/fs.util';

/**
 * This class contains business logic for books.
 * Interacts with the database.
 */
class BooksService {
	public static find(booksFilters: BookFiltersDtoParsed): BookDto[] {
		let books: Book[] = BookRepository.cache;

		if (Object.keys(booksFilters).length !== 0) {
			BooksDataValidator.validateGettingAll(booksFilters);

			const { searchTitle, searchAuthorFullName, searchGenreIds } = booksFilters;

			books = this.filter(books, searchTitle, searchAuthorFullName, searchGenreIds);
		}

		if (books.length === 0) return [];
		return this.parseArrayToDto(books);
	}

	public static findOne(id: number): BookDetailsDto {
		const book = BooksDataValidator.validateGetting(id);
		return this.parseToDetailsDto(book);
	}

	public static getById(id: number): Book | undefined {
		return BookRepository.cache.find((book) => book.id === id);
	}

	public static getByTitle(title: string): Book[] {
		return BookRepository.cache.filter((book) => book.title === title);
	}

	public static async create(createBookDto: CreateBookDto): Promise<BookDto> {
		await BooksDataValidator.validateCreating(createBookDto);

		const { authorId, title, description, genreIds } = createBookDto;

		const okPacket: OkPacket = await BookRepository.create(
			authorId,
			title,
			description,
			null,
			null
		);

		const newBook: Book | undefined = await BookRepository.get(okPacket.insertId);

		if (!newBook) throw new Error('Book creation is failed');

		/* Add Genre Connections */
		for (const genreId of genreIds) {
			await BookGenreRepository.create(newBook.id, genreId);
		}

		await Promise.all([BookRepository.store(), BookGenreRepository.store()]);
		return this.parseToDetailsDto(newBook);
	}

	public static async uploadImage(id: number, image: Express.Multer.File) {
		const { book } = await BooksDataValidator.validateGetting(id);
		const { filename } = image;
		//delete old image file
		if (book.image_file) await deleteFile(path.join(STATIC_DIR, book.image_file));
		await BookRepository.update(
			book.author_id,
			book.title,
			book.description,
			filename,
			book.book_file,
			book.id
		);
		await BookRepository.store();
	}

	public static async uploadFile(id: number, file: Express.Multer.File) {
		const { book } = await BooksDataValidator.validateGetting(id);
		const { filename } = file;
		//delete old book file
		if (book.book_file) await deleteFile(path.join(STATIC_DIR, book.book_file));
		await BookRepository.update(
			book.author_id,
			book.title,
			book.description,
			book.image_file,
			filename,
			book.id
		);
		await BookRepository.store();
	}

	public static async update(id: number, updateBookDto: UpdateBookDto) {
		let { book } = BooksDataValidator.validateUpdating(id, updateBookDto);

		if (updateBookDto) {
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
			if (newGenreIds) {
				await this.updateGenres(book, newGenreIds);
			}
		}
		await BookRepository.store();
	}

	public static async delete(id: number) {
		const book: Book = await BooksDataValidator.validateDeleting(id);
		await BookRepository.delete(book.id);
		await Promise.all([
			deleteFile(path.join(STATIC_DIR, book.image_file)),
			deleteFile(path.join(STATIC_DIR, book.book_file)),
		]);
		await BookRepository.store();
	}

	/**
	 * Returns book genres.
	 * @param bookId
	 */
	public static getGenres(bookId: number): BookDto_Genre[] {
		// genre ids of book
		const genreIds: number[] = BookGenreRepository.cache
			.filter((connection: BookGenre) => connection.book_id === bookId)
			.map((connection: BookGenre) => connection.genre_id);

		return genreIds.map((genreId) => {
			const { id, name } = GenreRepository.cache.find(
				(genre) => genre.id === genreId
			);
			return { id, name };
		});
	}

	private static parseArrayToDto(books: Book[]): BookDto[] {
		return books.map((book) => this.parseToDto(book));
	}

	private static parseToDto(book: Book): BookDto {
		const {
			id,
			title,
			description,
			image_file: imageFile,
			book_file: bookFile,
			created_at: createdAt,
		} = book;

		const author = AuthorRepository.cache.find(
			(author) => author.id === book.author_id
		);
		const genres = this.getGenres(id);

		return {
			id,
			author: { id: author.id, fullName: author.full_name },
			title,
			genres,
			description,
			imageFile,
			bookFile,
			createdAt,
		};
	}

	private static parseToDetailsDto(book: Book): BookDetailsDto {
		const bookDto: BookDto = this.parseToDto(book);

		// add reviews
		const bookReviews: Review[] = ReviewRepository.cache.filter(
			(review) => review.book_id === book.id
		);

		const reviews = [];
		for (const review of bookReviews) {
			const user = UserRepository.cache.find(
				(user) => user.id === review.user_id
			) as User;
			reviews.push({
				user: { id: user.id, username: user.username },
				score: review.score,
				comment: review.comment,
				createdAt: review.created_at,
			});
		}

		// add average score
		let sum: number = 0;
		for (const review of reviews) {
			sum += review.score;
		}

		const averageScore = sum === 0 ? 0 : sum / reviews.length;

		// add addition number
		const additions: BooklistItem[] = BooklistItemRepository.cache.filter(
			(addition) => addition.book_id === book.id
		);

		const additionNumber = additions.length;

		return {
			...bookDto,
			reviews,
			averageScore,
			additionNumber,
		};
	}

	private static filter(
		books: Book[],
		title?: string,
		authorFullName?: string,
		genresIds?: Set<number>
	): Book[] {
		if (title) {
			books = this.filterByTitle(books, title);
		}

		if (authorFullName) {
			books = this.filterByAuthor(books, authorFullName);
		}

		if (genresIds) {
			books = this.filterByGenres(books, genresIds);
		}

		return books;
	}

	private static filterByTitle(books: Book[], title: string): Book[] {
		books = books.filter((book) => {
			const regExp = new RegExp(title, 'i');
			return regExp.test(book.title);
		});

		return books;
	}

	private static filterByAuthor(books: Book[], authorFullName: string): Book[] {
		const booksFiltered: Book[] = [];
		for (const book of books) {
			const author: Author | undefined = AuthorRepository.cache.find(
				(author) => author.id === book.author_id
			);
			if (author) {
				const regExp = new RegExp(authorFullName, 'i');
				const res: boolean = regExp.test(author.full_name);
				if (res) booksFiltered.push(book);
			}
		}

		return booksFiltered;
	}

	private static filterByGenres(books: Book[], searchGenreIds: Set<number>): Book[] {
		const filteredBooks: Book[] = [];
		const genreIdsArray = Array.from(searchGenreIds.values());

		for (const book of books) {
			const bookGenreIds: number[] = BookGenreRepository.cache
				.filter((bookGenre) => bookGenre.book_id === book.id)
				.map((bookGenre) => bookGenre.genre_id);

			const intersection: number[] = genreIdsArray.filter((genreId) =>
				bookGenreIds.includes(genreId)
			);

			if (intersection.length === genreIdsArray.length) {
				filteredBooks.push(book);
			}
		}

		return filteredBooks;
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

	private static async updateGenres(book: Book, newGenreIds: Set<number>) {
		// get genres ids only for book
		let bookGenreIds: number[] = (await BookGenreRepository.getAll())
			.filter((bookGenre) => bookGenre.book_id === book.id)
			.map((bookGenre) => bookGenre.genre_id);

		// delete extra genres from book
		for (const genreId of bookGenreIds) {
			if (!Array.from(newGenreIds).includes(genreId)) {
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
}

export default BooksService;
