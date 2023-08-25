import path from 'path';
import { OkPacket } from 'mysql2';

import { AuthorsFiltersDto } from '../controllers/authors/dto/authors-filters.dto';
import { AuthorDto } from '../controllers/authors/dto/author.dto';
import {
	AuthorDetailsDto,
	AuthorDetailsDto_Book,
} from '../controllers/authors/dto/author-details.dto';
import { CreateAuthorDto } from '../controllers/authors/dto/create-author.dto';
import { UpdateAuthorDto } from '../controllers/authors/dto/update-author.dto';
import { GenreDto } from '../controllers/genres/dto/genre.dto';

import { Author, AuthorRepository } from '../models/author.model';
import { Book, BookRepository } from '../models/book.model';

import { STATIC_DIR } from '../utils/multer.util';
import AuthorsDataValidator from '../validators/data/authors.data.validator';
import BooksService from './books.service';
import { deleteFile } from '../utils/fs.util';

/**
 * This class contains business logic for authors.
 * Interacts with the database.
 */
class AuthorsService {
	public static find(authorsFilters: AuthorsFiltersDto): AuthorDto[] {
		let authors: Author[] = AuthorRepository.cache;

		const { searchFullName } = authorsFilters;

		if (searchFullName) {
			authors = this.filterByFullName(authors, searchFullName);
		}

		return this.parseArrayToDto(authors);
	}

	public static findOne(id: number): AuthorDetailsDto {
		const author: Author = AuthorsDataValidator.validateGetting(id);
		return this.parseToDetailsDto(author);
	}

	public static getById(id: number): Author | undefined {
		return AuthorRepository.cache.find((author) => author.id === id);
	}

	public static getByFullName(fullName: string): Author | undefined {
		return AuthorRepository.cache.find((author) => author.full_name === fullName);
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

		await AuthorRepository.store();

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
		await AuthorRepository.store();
	}

	public static async uploadImage(id: number, image: Express.Multer.File) {
		const author = await AuthorsDataValidator.validateGetting(id);

		const { filename } = image;
		//delete old image file
		if (author.image_file) {
			await deleteFile(path.join(STATIC_DIR, author.image_file));
		}

		await AuthorRepository.update(
			author.full_name,
			author.born_at,
			author.died_at,
			author.info,
			filename,
			author.id
		);
		await AuthorRepository.store();
	}

	public static async delete(id: number) {
		const author: Author = await AuthorsDataValidator.validateDeleting(id);
		await AuthorRepository.delete(author.id);
		await deleteFile(path.join(STATIC_DIR, author.image_file));
		await AuthorRepository.store();
	}

	/**
	 * Returns author books.
	 * @param authorId
	 */
	public static getBooks(authorId: number): AuthorDetailsDto_Book[] {
		const books = BookRepository.cache;
		const authorBooks: Book[] = books.filter((book) => book.author_id === authorId);
		return authorBooks.map((book) => {
			const { id, title, image_file: imageFile } = book;
			const genres: GenreDto[] = BooksService.getGenres(id);
			return { id, title, genres, imageFile };
		});
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

	private static filterByFullName(authors: Author[], fullName: string): Author[] {
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

	private static parseToDto(author: Author): AuthorDto {
		const {
			id,
			full_name: fullName,
			image_file: imageFile,
			created_at: createdAt,
		} = author;
		return { id, fullName, imageFile, createdAt };
	}

	private static parseToDetailsDto(author: Author): AuthorDetailsDto {
		const authorDto = this.parseToDto(author);
		const books = this.getBooks(author.id);
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
