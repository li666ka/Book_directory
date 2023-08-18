import fs from 'fs';
import path from 'path';
import { OkPacket } from 'mysql2';

import AuthorDataValidator from '../validators/data/author.data.validator';
import BooksService from './books.service';
import { Author, AuthorRepository } from '../models/author.model';

import { BookDto } from '../controllers/books/dto/book.dto';
import { AuthorsFiltersDto } from '../controllers/authors/dto/authors-filters.dto';
import { AuthorDto } from '../controllers/authors/dto/author.dto';
import { AuthorDetailsDto } from '../controllers/authors/dto/author-details.dto';
import { CreateAuthorDto } from '../controllers/authors/dto/create-author.dto';
import { UpdateAuthorDto } from '../controllers/authors/dto/update-author.dto';

import { STATIC_DIR } from '../utils/multer.util';

class AuthorsService {
	public static async find(authorsFilters: AuthorsFiltersDto): Promise<AuthorDto[]> {
		let authors: Author[] = await AuthorRepository.getAll();

		const { searchFullName } = authorsFilters;

		if (searchFullName) {
			authors = await this.filterByFullName(authors, searchFullName);
		}

		return new Promise<AuthorDto[]>(() => this.parseToDto(authors));
	}

	public static async findOne(id: number): Promise<AuthorDetailsDto> {
		const author: Author = await AuthorDataValidator.validateGetting(id);
		return this.parseToDetailsDto(author);
	}

	public static async create(
		createAuthorDto: CreateAuthorDto
	): Promise<AuthorDetailsDto> {
		await AuthorDataValidator.validateCreating(createAuthorDto);
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
		const validationResult = await AuthorDataValidator.validateUpdating(
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
		const author = await AuthorDataValidator.validateGetting(id);

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
		const author: Author = await AuthorDataValidator.validateDeleting(id);
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

	private static parseToDto(input: Author | Author[]): AuthorDto | AuthorDto[] {
		if (Array.isArray(input)) {
			const authorsDto: AuthorDto[] = [];
			for (const author of input) {
				const authorDto: AuthorDto = {
					id: author.id,
					fullName: author.full_name,
					imageFile: author.image_file,
					createdAt: author.created_at,
				};
				authorsDto.push(authorDto);
			}
			return authorsDto;
		} else {
			return {
				id: input.id,
				fullName: input.full_name,
				imageFile: input.image_file,
				createdAt: input.created_at,
			};
		}
	}

	private static createDto(
		id: number,
		fullName: string,
		imageFile: string,
		createdAt: string
	) {}

	private static async parseToDetailsDto(author: Author): Promise<AuthorDetailsDto> {
		const authorDto = this.parseToDto(author) as AuthorDto;
		const books = (
			await BooksService.find({ searchAuthorFullName: author.full_name })
		).map((book: BookDto) => {
			return {
				id: book.id,
				title: book.title,
				genres: book.genres,
				imageFile: book.imageFile,
			};
		});
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
