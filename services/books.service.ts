import fs from 'fs';
import path from 'path';
import { OkPacket } from 'mysql2';

import { Book, BookRepository } from '../models/book.model';
import { Author, AuthorRepository } from '../models/author.model';
import { BookGenre, BookGenreRepository } from '../models/book_genre.model';
import { Genre, GenreRepository } from '../models/genre.model';
import { Review, ReviewRepository } from '../models/review.model';
import { BooklistItem, BooklistItemRepository } from '../models/booklist_item.model';

import { BookFiltersDtoParsed } from '../types/dto_parsed.types';

import BookValidator from './validators/book.validator';
import { STATIC_DIR } from '../utils/multer.util';
import { BookDto } from '../controllers/books/dto/book.dto';
import { BookDetailsDto } from '../controllers/books/dto/book_details.dto';
import { CreateBookDto } from '../controllers/books/dto/create_book.dto';
import { UpdateBookDto } from '../controllers/books/dto/update_book.dto';
import { GenreDto } from '../controllers/genres/dto/genre.dto';
import UsersService from './users.service';
import { User, UserRepository } from '../models/user.model';

class BooksService {
	public static async find(
		booksFilters: BookFiltersDtoParsed | undefined
	): Promise<BookDto[]> {
		if (booksFilters) await BookValidator.validateGettingAll(booksFilters);

		let books: Book[] = await BookRepository.getAll();

		if (booksFilters) {
			const { searchTitle, searchAuthorFullName, searchGenreIds } = booksFilters;

			books = await this.filter(
				books,
				searchTitle as string,
				searchAuthorFullName as string,
				searchGenreIds
			);
		}

		const booksDto: BookDto[] = [];
		for (const book of books) {
			const bookDto: BookDto = await this.parseToDto(book);
			booksDto.push(bookDto);
		}

		return booksDto;
	}

	public static async findOne(id: number): Promise<BookDetailsDto> {
		const book = await BookValidator.validateGetting(id);
		return await this.parseToDetailsDto(book);
	}

	public static async create(createBookDto: CreateBookDto): Promise<BookDto> {
		await BookValidator.validateCreating(createBookDto);

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

		return await this.parseToDto(newBook);
	}

	public static async uploadImage(id: number, image: Express.Multer.File) {
		const { book } = await BookValidator.validateGetting(id);
		const { filename } = image;
		//delete old image file
		if (book.image_file) fs.rmSync(path.join(STATIC_DIR, book.image_file));
		await BookRepository.update(
			book.author_id,
			book.title,
			book.description,
			filename,
			book.book_file,
			book.id
		);
	}

	public static async uploadFile(id: number, file: Express.Multer.File) {
		const { book } = await BookValidator.validateGetting(id);
		const { filename } = file;
		//delete old book file
		if (book.book_file) fs.rmSync(path.join(STATIC_DIR, book.book_file));
		await BookRepository.update(
			book.author_id,
			book.title,
			book.description,
			book.image_file,
			filename,
			book.id
		);
	}

	public static async update(id: number, updateBookDto: UpdateBookDto) {
		let { book } = await BookValidator.validateUpdating(id, updateBookDto);

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
	}

	public static async delete(id: number) {
		const book: Book = await BookValidator.validateDeleting(id);
		await BookRepository.delete(book.id);
		fs.rmSync(path.join(STATIC_DIR, book.image_file));
		fs.rmSync(path.join(STATIC_DIR, book.book_file));
	}

	public static async getGenres(bookId: number): Promise<GenreDto[]> {
		const genreIds: number[] = (await BookGenreRepository.getAll())
			.filter((bookGenre) => bookGenre.book_id === bookId)
			.map((bookGenre) => bookGenre.genre_id);

		const genres: GenreDto[] = [];

		for (const genreId of genreIds) {
			const genre = (await GenreRepository.get(genreId)) as Genre;
			genres.push({ id: genre.id, name: genre.name });
		}

		return genres;
	}

	public static async parseToDto(book: Book): Promise<BookDto> {
		const author = (await AuthorRepository.get(book.author_id)) as Author;

		const genres: GenreDto[] = await this.getGenres(book.id);

		return {
			id: book.id,
			author: { id: author.id, fullName: author.full_name },
			title: book.title,
			genres,
			description: book.description,
			imageFile: book.image_file,
			bookFile: book.book_file,
			createdAt: book.created_at,
		};
	}

	public static async parseToDetailsDto(book: Book): Promise<BookDetailsDto> {
		const bookDto: BookDto = await this.parseToDto(book);

		// add reviews
		let bookReviews: Review[] = (await ReviewRepository.getAll()).filter(
			(review) => review.book_id === bookDto.id
		);

		const reviews = [];
		for (const review of bookReviews) {
			const user = (await UserRepository.get(review.user_id)) as User;
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
		const additions: BooklistItem[] = (await BooklistItemRepository.getAll()).filter(
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

	private static async filter(
		books: Book[],
		title?: string,
		authorFullName?: string,
		genresIds?: Set<number>
	): Promise<Book[]> {
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
		searchGenreIds: Set<number>
	): Promise<Book[]> {
		const filteredBooks: Book[] = [];
		const genreIdsArray = Array.from(searchGenreIds.values());

		for (const book of books) {
			const bookGenreIds: number[] = (await BookGenreRepository.getAll())
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
