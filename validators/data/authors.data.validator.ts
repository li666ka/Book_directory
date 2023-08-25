import { Author } from '../../models/author.model';
import { Genre } from '../../models/genre.model';
import { UpdateAuthorDto } from '../../controllers/authors/dto/update-author.dto';
import { CreateAuthorDto } from '../../controllers/authors/dto/create-author.dto';
import { AppError, HttpCode } from '../../exceptions/app-error';
import AuthorsService from '../../services/authors.service';
import GenresService from '../../services/genres.service';

class AuthorsDataValidator {
	/**
	 * Validates input author id.
	 * @param id
	 * Returns Author by input id if it exists.
	 */
	public static validateGetting(id: number): Author {
		const author: Author | undefined = AuthorsService.getById(id);

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
	 * Returns object with author image filename and book files.
	 */
	public static validateCreating(createAuthorDto: CreateAuthorDto) {
		const { fullName, book } = createAuthorDto;

		const authorSameFullName: Author | undefined =
			AuthorsService.getByFullName(fullName);

		if (authorSameFullName)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Author with full name ${fullName} already exists`
			);

		const { genreIds } = book;
		for (const genreId of genreIds) {
			const genre: Genre | undefined = GenresService.getById(genreId);
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
	 * Returns object with Author by input id and author image filename or throws Error.
	 */
	public static validateUpdating(id: number, updateAuthorDto: UpdateAuthorDto): Author {
		const author: Author | undefined = AuthorsService.getById(id);
		if (!author) throw new Error(`Author with id ${id} does not exist`);

		const { fullName } = updateAuthorDto;

		if (fullName) {
			const authorSame: Author | undefined = AuthorsService.getByFullName(fullName);

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
	public static validateDeleting(id: number): Author {
		const author: Author | undefined = AuthorsService.getById(id);

		if (!author)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Author with id ${id} does not exist`
			);

		return author;
	}
}

export default AuthorsDataValidator;
