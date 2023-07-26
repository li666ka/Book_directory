import CreateAuthorDto from '../../controllers/authors/dto/create_author.dto';
import UpdateAuthorDto from '../../controllers/authors/dto/update_author.dto';

import { Author, AuthorRepository } from '../../models/author.model';
import { Genre, GenreRepository } from '../../models/genre.model';

class AuthorValidator {
	/**
	 * Validates input author id.
	 * @param id
	 * Returns Author by input id ot throws Error.
	 */
	public static async validateGetting(id: string): Promise<Author> {
		const idParsed: number = parseInt(id, 10);

		const author: Author | undefined = await AuthorRepository.get(idParsed);
		if (!author) throw new Error(`Author with id ${id} does not exist`);

		return author;
	}

	/**
	 * Validates input createAuthorDto and multer files.
	 * @param createAuthorDto
	 * @param files
	 * Returns object with author image filename and book files or throws Error.
	 */
	public static async validateCreating(
		createAuthorDto: CreateAuthorDto,
		files: { [key: string]: Express.Multer.File[] }
	): Promise<{
		authorImageFile: string;
		bookImageFile: Express.Multer.File;
		bookFile: Express.Multer.File;
	}> {
		const { fullName, book } = createAuthorDto;

		const author: Author | undefined = (await AuthorRepository.getAll()).find(
			(author) => author.full_name === fullName
		);

		if (author) throw new Error(`Author with full name ${fullName} already exists`);

		const { genreIds } = book;
		for (const genreId of genreIds) {
			const genre: Genre | undefined = await GenreRepository.get(genreId);
			if (!genre) throw new Error(`Genre with id ${genreId} does not exist`);
		}

		// validate files
		const bookImageFile: Express.Multer.File | undefined = files['book-image']
			? files['book-image'][0]
			: undefined;
		const bookFile: Express.Multer.File | undefined = files['book-file']
			? files['book-file'][0]
			: undefined;
		const authorImageFile: string | undefined = files['author-image']
			? files['author-image'][0].filename
			: undefined;

		if (!bookImageFile) throw new Error('image file is undefined');
		if (!bookFile) throw new Error('book file is undefined');
		if (!authorImageFile) throw new Error('author image file is undefined');

		return { bookImageFile, authorImageFile, bookFile };
	}

	/**
	 * Validates input id, updateAuthorDto and multer files.
	 * @param id
	 * @param updateAuthorDto
	 * @param files
	 * Returns object with Author by input id and author image filename or throws Error.
	 */
	public static async validateUpdating(
		id: string,
		updateAuthorDto: UpdateAuthorDto,
		files: { [key: string]: Express.Multer.File[] }
	): Promise<{ author: Author; imageFile?: string }> {
		const idParsed: number = parseInt(id, 10);

		const author: Author | undefined = await AuthorRepository.get(idParsed);

		if (!author) throw new Error(`Author with id ${idParsed} does not exist`);

		const { fullName, bornAt, info, diedAt } = updateAuthorDto;

		const imageFile: string | undefined = files['author-image']
			? files['author-image'][0].filename
			: undefined;

		if (!(fullName || bornAt || diedAt || info || imageFile))
			throw new Error('No properties for updating');

		if (fullName) {
			const authorSame: Author | undefined = (await AuthorRepository.getAll()).find(
				(author) => author.full_name === fullName
			);

			if (authorSame)
				throw new Error(`Author with full name ${fullName} already exists`);
		}

		return { author, imageFile };
	}

	/**
	 * Validates input id.
	 * @param id
	 * Returns Author by input id or throws Error.
	 */
	public static async validateDeleting(id: string): Promise<Author> {
		const idParsed: number = parseInt(id, 10);

		const author: Author | undefined = await AuthorRepository.get(idParsed);

		if (!author) throw new Error(`Author with id ${id} does not exist`);

		return author;
	}
}

export default AuthorValidator;
