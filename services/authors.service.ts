import fs from 'fs';
import path from 'path';
import { OkPacket } from 'mysql2';

import AuthorsDataValidator from '../validators/data/authors.data.validator';
import BooksService from './books.service';
import { Author, AuthorRepository } from '../models/author.model';

import { BookDto } from '../controllers/books/dto/book.dto';
import { AuthorsFiltersDto } from '../controllers/authors/dto/authors-filters.dto';
import { AuthorDto } from '../controllers/authors/dto/author.dto';
import {
	AuthorDetailsDto,
	AuthorDetailsDto_Book,
} from '../controllers/authors/dto/author-details.dto';
import { CreateAuthorDto } from '../controllers/authors/dto/create-author.dto';
import { UpdateAuthorDto } from '../controllers/authors/dto/update-author.dto';

import { STATIC_DIR } from '../utils/multer.util';
import { Book, BookRepository } from '../models/book.model';
import { BookGenre, BookGenreRepository } from '../models/book-genre.model';
import { GenreDto } from '../controllers/genres/dto/genre.dto';

class AuthorsService {
	public static async find(authorsFilters: AuthorsFiltersDto): Promise<AuthorDto[]> {
		let authors: Author[] = await AuthorRepository.getAll();

		const { searchFullName } = authorsFilters;

		if (searchFullName) {
			authors = await this.filterByFullName(authors, searchFullName);
		}

		return this.parseArrayToDto(authors);
	}

	public static async findOne(id: number): Promise<AuthorDetailsDto> {
		const author: Author = await AuthorsDataValidator.validateGetting(id);
		return this.parseToDetailsDto(author);
	}

	public static async create(
		createAuthorDto: CreateAuthorDto
	): Promise<AuthorDetailsDto> {
		await AuthorsDataValidator.validateCreating(createAuthorDto);
		const { fullName, bornAt, info, diedAt, book } = createAuthorDto;

		// insert into 'books' table new book
		const okPacket: OkPacket = await AuthorRepository.create(
			fullName,
			bornAt,
			diedAt ? diedAt : null,
			null,
			info
		);

		const newAuthor = (await AuthorRepository.get(okPacket.insertId)) as Author;

		// create new author book
		await BooksService.create({
			authorId: newAuthor.id,
			title: book.title,
			description: book.description,
			genreIds: book.genreIds,
		});

		return this.parseToDetailsDto(newAuthor);
	}

	public static async update(id: number, updateAuthorDto: UpdateAuthorDto) {
		const validationResult = await AuthorsDataValidator.validateUpdating(
			id,
			updateAuthorDto
		);

		let { author } = validationResult;

		if (updateAuthorDto) {
			const { fullName, bornAt, diedAt, info } = updateAuthorDto;

			if (fullName) {
				await this.updateFullName(author, fullName);
				author = (await AuthorRepository.get(author.id)) as Author;
			}
			if (bornAt) {
				await this.updateBornAt(author, bornAt);
				author = (await AuthorRepository.get(author.id)) as Author;
			}
			if (diedAt) {
				await this.updateDiedAt(author, diedAt);
				author = (await AuthorRepository.get(author.id)) as Author;
			}
			if (info) {
				await this.updateInfo(author, info);
				author = (await AuthorRepository.get(author.id)) as Author;
			}
		}
	}

	public static async uploadImage(id: number, image: Express.Multer.File) {
		const author = await AuthorsDataValidator.validateGetting(id);

		const { filename } = image;
		//delete old image file
		if (author.image_file) fs.rmSync(path.join(STATIC_DIR, author.image_file));

		await AuthorRepository.update(
			author.full_name,
			author.born_at,
			author.died_at,
			author.info,
			filename,
			author.id
		);
	}

	public static async delete(id: number) {
		const author: Author = await AuthorsDataValidator.validateDeleting(id);
		await AuthorRepository.delete(author.id);
		fs.rmSync(path.join(STATIC_DIR, author.image_file));
	}

	private static async updateFullName(author: Author, newFullName: string) {
		await AuthorRepository.update(
			newFullName,
			author.born_at,
			author.died_at,
			author.info,
			author.image_file,
			author.id
		);
	}

	private static async updateBornAt(author: Author, newBornAt: string) {
		await AuthorRepository.update(
			author.full_name,
			newBornAt,
			author.died_at,
			author.info,
			author.image_file,
			author.id
		);
	}

	private static async updateDiedAt(author: Author, newDiedAt: string) {
		await AuthorRepository.update(
			author.full_name,
			author.born_at,
			newDiedAt,
			author.info,
			author.image_file,
			author.id
		);
	}

	private static async updateInfo(author: Author, newInfo: string) {
		await AuthorRepository.update(
			author.full_name,
			author.born_at,
			author.died_at,
			newInfo,
			author.image_file,
			author.id
		);
	}

	private static async filterByFullName(
		authors: Author[],
		fullName: string
	): Promise<Author[]> {
		return authors.filter((author) => {
			const regExp = new RegExp(fullName, 'i');
			return regExp.test(author.full_name);
		});
	}

	private static parseArrayToDto(authors: Author[]): AuthorDto[] {
		const authorsDto: AuthorDto[] = [];
		for (const author of authors) {
			const authorDto: AuthorDto = this.parseToDto(author);
			authorsDto.push(authorDto);
		}
		return authorsDto;
	}

	public static parseToDto(author: Author): AuthorDto {
		return {
			id: author.id,
			fullName: author.full_name,
			imageFile: author.image_file,
			createdAt: author.created_at,
		};
	}

	public static async getBooks(authorId: number): Promise<AuthorDetailsDto_Book[]> {
		let [booksAll, booksGenresAll] = await Promise.all([
			BookRepository.getAll(),
			BookGenreRepository.getAll(),
		]);

		booksAll = booksAll as Book[];
		booksGenresAll = booksGenresAll as BookGenre[];

		// set context for getGenres function and get this function
		const getBookGenres = BooksService.getGenres.bind({
			connections: booksGenresAll,
		});

		const parseBook = async (book: Book): Promise<AuthorDetailsDto_Book> => {
			const { id, title, image_file: imageFile } = book;
			const genres: GenreDto[] = await getBookGenres(id);
			return { id, title, genres, imageFile };
		};

		const authorBooks: Book[] = booksAll.filter(
			(book) => book.author_id === authorId
		);

		const booksParsing = authorBooks.map((book) => parseBook(book));

		return await Promise.all(booksParsing);
	}

	private static async parseToDetailsDto(author: Author): Promise<AuthorDetailsDto> {
		const authorDto = this.parseToDto(author);
		const books = await this.getBooks(author.id);
		return {
			...authorDto,
			bornAt: author.born_at,
			diedAt: author.died_at,
			info: author.info,
			books,
		};
	}
}

export default AuthorsService;
