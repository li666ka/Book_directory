import fs from 'fs';
import path from 'path';

import AuthorsFiltersDto from '../controllers/authors/dto/authors_filters.dto';
import AuthorDto from '../controllers/authors/dto/author.dto';
import { Author, AuthorRepository } from '../models/author.model';
import AuthorValidator from '../validators/author.validator';
import BooksService from './books.service';
import { OkPacket } from 'mysql2';

class AuthorsService {
	/**
	 *
	 */
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

	public static async findOne(id: string | undefined): Promise<AuthorDto | never> {
		const author: Author = await AuthorValidator.validateGetting(id);
		return this.parseToDto(author);
	}

	/**
	 * Creates new author:
	 * 	- creates new author directory
	 * 	- adds author image file to new author directory
	 * 	- inserts into 'authors' table new author
	 * 	- creates new book of new author (delegated to BooksService)
	 * @param createAuthorDto
	 * @param files
	 * @return newAuthor
	 */
	public static async create(
		createAuthorDto: CreateAuthorDto | undefined,
		files: { [key: string]: Express.Multer.File[] } | undefined
	): Promise<AuthorDto | never> {
		console.log('here');
		const { bookImageFile, bookFile, authorImageFile } =
			await AuthorValidator.validateCreating(createAuthorDto, files);

		createAuthorDto = createAuthorDto as CreateAuthorDto;
		const { fullName, bornAt, info, diedAt, book } = createAuthorDto;

		// create new author directory
		const authorFolder: string = fullName.replaceAll(' ', '_');
		fs.mkdirSync(path.join('content', authorFolder));
		// move author image to new directory
		const imgUrl: string = this.moveNewFileToAuthorDir(authorImageFile, fullName);

		// insert into 'books' table new book
		const okPacket: OkPacket = await AuthorRepository.create(
			fullName,
			bornAt,
			imgUrl,
			info,
			diedAt
		);

		const newAuthor = (await AuthorRepository.get(okPacket.insertId)) as Author;

		// create new author book
		await BooksService.create(
			{
				authorId: newAuthor.id,
				title: book.title,
				description: book.description,
				genresIds: book.genresIds,
			},
			{ 'book-image': [bookImageFile], 'book-file': [bookFile] }
		);

		return this.parseToDto(newAuthor);
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

	private static moveNewFileToAuthorDir(
		file: Express.Multer.File,
		fullName: string
	): string {
		const authorFolder: string = fullName.replaceAll(' ', '_');

		const newFilename: string = authorFolder + path.extname(file.originalname);

		const fileOldPath: string = file.path;
		const fileNewPath: string = path.join('content', authorFolder, newFilename);

		fs.renameSync(fileOldPath, fileNewPath);

		return path.join(authorFolder, newFilename);
	}

	private static async parseToDto(author: Author): Promise<AuthorDto> {
		const books = (
			await BooksService.find({ searchAuthorFullName: author.full_name })
		).map((book) => {
			return {
				id: book.id,
				title: book.title,
				genres: book.genres,
				imgUrl: book.imgUrl,
			};
		});

		return {
			id: author.id,
			fullName: author.full_name,
			bornAt: author.born_at,
			diedAt: author.died_at,
			imgUrl: author.img_url,
			info: author.info,
			createdAt: author.created_at,
			books,
		} as AuthorDto;
	}
}

export default AuthorsService;
