import { Author, AuthorRepository } from '../../models/author.model';
import { Genre, GenreRepository } from '../../models/genre.model';
import {
	AUTHOR_IMAGE_FIELD,
	BOOK_FILE_FIELD,
	BOOK_IMAGE_FIELD,
} from '../../utils/multer.util';
import { UpdateAuthorDto } from '../../controllers/authors/dto/update_author.dto';
import { CreateAuthorDto } from '../../controllers/authors/dto/create_author.dto';
import { AppError, HttpCode } from '../../exceptions/app_error';

class AuthorDataValidator {
	/**
	 * Validates input author id.
	 * @param id
	 * Returns Author by input id if it exists.
	 */
	public static async validateGetting(id: number): Promise<Author> {
		const author: Author | undefined = await AuthorRepository.get(id);
		if (!author)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Author with id ${id} does not exist`
			);

		return author;
	}

	/**
	 * Validates input createAuthorDto and multer files.
	 * @param createAuthorDto
	 * @param files
	 * Returns object with author image filename and book files.
	 */
	public static async validateCreating(createAuthorDto: CreateAuthorDto) {
		const { fullName, book } = createAuthorDto;

		const authorSameFullName: Author | undefined = (
			await AuthorRepository.getAll()
		).find((author) => author.full_name === fullName);

		if (authorSameFullName)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Author with full name ${fullName} already exists`
			);

		const { genreIds } = book;
		for (const genreId of genreIds) {
			const genre: Genre | undefined = await GenreRepository.get(genreId);
			if (!genre)
				throw new AppError(
					HttpCode.BAD_REQUEST,
					`Genre with id ${genreId} does not exist`
				);
		}
	}

	/**
	 * Validates input id, updateAuthorDto and multer files.
	 * @param id
	 * @param updateAuthorDto
	 * @param files
	 * Returns object with Author by input id and author image filename or throws Error.
	 */
	public static async validateUpdating(
		id: number,
		updateAuthorDto: UpdateAuthorDto
	): Promise<Author> {
		const author: Author | undefined = await AuthorRepository.get(id);
		if (!author) throw new Error(`Author with id ${id} does not exist`);

		const { fullName } = updateAuthorDto;

		if (fullName) {
			const authorSame: Author | undefined = (await AuthorRepository.getAll()).find(
				(author) => author.full_name === fullName
			);

			if (authorSame)
				throw new AppError(
					HttpCode.BAD_REQUEST,
					`Author with full name ${fullName} already exists`
				);
		}

		return author;
	}

	/**
	 * Validates input id.
	 * @param id
	 * Returns Author by input id or throws Error.
	 */
	public static async validateDeleting(id: number): Promise<Author> {
		const author: Author | undefined = await AuthorRepository.get(id);

		if (!author)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Author with id ${id} does not exist`
			);

		return author;
	}
}

export default AuthorDataValidator;
