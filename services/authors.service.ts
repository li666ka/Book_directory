import { OkPacket } from 'mysql2';
import fs from 'fs';
import path from 'path';

import AuthorDto from '../controllers/authors/dto/author.dto';
import AuthorDetailsDto from '../controllers/authors/dto/author_details.dto';
import AuthorsFiltersDto from '../controllers/authors/dto/authors_filters.dto';
import UpdateAuthorDto from '../controllers/authors/dto/update_author.dto';

import AuthorValidator from '../validators/author.validator';

import { Author, AuthorRepository } from '../models/author.model';

import { STATIC_DIR } from '../configs/multer.config';
import BooksService from './books.service';

class AuthorsService {
	public static async find(
		authorsFilters: AuthorsFiltersDto | undefined
	): Promise<AuthorDto[] | never> {
		let authors: Author[] = await AuthorRepository.getAll();

		if (authorsFilters) {
			const { searchFullName } = authorsFilters;

			if (searchFullName) {
				authors = await this.filterByFullName(authors, searchFullName);
			}
		}

		const authorsDto: AuthorDto[] = [];
		for (const author of authors) {
			const authorDto: AuthorDto = await this.parseToDto(author);
			authorsDto.push(authorDto);
		}

		return authorsDto;
	}

	public static async findOne(id: string): Promise<AuthorDetailsDto | never> {
		const author: Author = await AuthorValidator.validateGetting(id);
		return this.parseToDetailsDto(author);
	}

	public static async create(
		createAuthorDto: CreateAuthorDto | undefined,
		files: { [key: string]: Express.Multer.File[] } | undefined
	): Promise<AuthorDetailsDto | never> {
		const { bookImageFile, bookFile, authorImageFile } =
			await AuthorValidator.validateCreating(createAuthorDto, files);

		createAuthorDto = createAuthorDto as CreateAuthorDto;
		const { fullName, bornAt, info, diedAt, book } = createAuthorDto;

		// insert into 'books' table new book
		const okPacket: OkPacket = await AuthorRepository.create(
			fullName,
			bornAt,
			diedAt ? diedAt : null,
			authorImageFile,
			info
		);

		const newAuthor = (await AuthorRepository.get(okPacket.insertId)) as Author;

		// create new author book
		await BooksService.create(
			{
				authorId: newAuthor.id,
				title: book.title,
				description: book.description,
				genreIds: book.genreIds,
			},
			{ 'book-image': [bookImageFile], 'book-file': [bookFile] }
		);

		return this.parseToDetailsDto(newAuthor);
	}

	public static async update(
		id: string,
		updateAuthorDto: UpdateAuthorDto | undefined,
		files: { [key: string]: Express.Multer.File[] } | undefined
	): Promise<void | never> {
		const validationResult = await AuthorValidator.validateUpdating(
			id,
			updateAuthorDto,
			files
		);

		updateAuthorDto = updateAuthorDto as UpdateAuthorDto;
		const { fullName, bornAt, diedAt, info } = updateAuthorDto;
		let { author } = validationResult;
		const { imageFile } = validationResult;

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
		if (imageFile) {
			await this.updateImageFile(author, imageFile);
		}
	}

	public static async delete(id: string) {
		const author: Author = await AuthorValidator.validateDeleting(id);
		await AuthorRepository.delete(author.id);
		fs.rmSync(path.join(STATIC_DIR, author.image_file));
	}

	private static async updateFullName(
		author: Author,
		newFullName: string
	): Promise<void | never> {
		await AuthorRepository.update(
			newFullName,
			author.born_at,
			author.died_at,
			author.info,
			author.image_file,
			author.id
		);
	}

	private static async updateBornAt(
		author: Author,
		newBornAt: string
	): Promise<void | never> {
		await AuthorRepository.update(
			author.full_name,
			newBornAt,
			author.died_at,
			author.info,
			author.image_file,
			author.id
		);
	}

	private static async updateDiedAt(
		author: Author,
		newDiedAt: string
	): Promise<void | never> {
		await AuthorRepository.update(
			author.full_name,
			author.born_at,
			newDiedAt,
			author.info,
			author.image_file,
			author.id
		);
	}

	private static async updateInfo(
		author: Author,
		newInfo: string
	): Promise<void | never> {
		await AuthorRepository.update(
			author.full_name,
			author.born_at,
			author.died_at,
			newInfo,
			author.image_file,
			author.id
		);
	}

	private static async updateImageFile(
		author: Author,
		newImageFile: string
	): Promise<void | never> {
		await AuthorRepository.update(
			author.full_name,
			author.born_at,
			author.died_at,
			author.info,
			newImageFile,
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

	private static parseToDto(author: Author): AuthorDto {
		return {
			id: author.id,
			fullName: author.full_name,
			imageFile: author.image_file,
			createdAt: author.created_at,
		};
	}

	private static async parseToDetailsDto(author: Author): Promise<AuthorDetailsDto> {
		const books = (
			await BooksService.find({ searchAuthorFullName: author.full_name })
		).map((book) => {
			return {
				id: book.id,
				title: book.title,
				genres: book.genres,
				imageFile: book.imageFile,
			};
		});

		return {
			id: author.id,
			fullName: author.full_name,
			bornAt: author.born_at,
			diedAt: author.died_at,
			info: author.info,
			imageFile: author.image_file,
			createdAt: author.created_at,
			books,
		};
	}
}

export default AuthorsService;
