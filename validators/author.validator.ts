import { Author, AuthorRepository } from '../models/author.model';
import { Genre, GenreRepository } from '../models/genre.model';
import UpdateAuthorDto from '../controllers/authors/dto/update_author.dto';

class AuthorValidator {
	public static async validateGetting(id: string): Promise<Author> {
		const idParsed: number = parseInt(id, 10);
		if (isNaN(idParsed)) throw new Error('id is invalid');

		const author: Author | undefined = await AuthorRepository.get(idParsed);
		if (!author) throw new Error(`Author with id ${id} does not exist`);

		return author;
	}

	public static async validateCreating(
		createAuthorDto: CreateAuthorDto | undefined,
		files: { [key: string]: Express.Multer.File[] } | undefined
	): Promise<{
		authorImageFile: string;
		bookImageFile: Express.Multer.File;
		bookFile: Express.Multer.File;
	}> {
		// validate createAuthorDto
		if (!createAuthorDto) throw new Error('Dto is empty');

		const { fullName, bornAt, info, book } = createAuthorDto;

		if (!fullName) throw new Error('fullName is undefined');

		const author: Author | undefined = (await AuthorRepository.getAll()).find(
			(author) => author.full_name === fullName
		);

		if (author) throw new Error(`Author with full name ${fullName} already exists`);

		if (!bornAt) throw new Error('bornAt is undefined');
		if (!info) throw new Error('info is undefined');
		if (!book) throw new Error('book is undefined');

		const { title, genreIds, description } = book;

		if (!title) throw new Error('title is undefined');
		if (!genreIds) throw new Error('genresIds is undefined');
		if (!description) throw new Error('description is undefined');

		for (const genreId of genreIds) {
			const genre: Genre | undefined = await GenreRepository.get(genreId);
			if (!genre) throw new Error(`Genre with id ${genreId} does not exist`);
		}

		// validate files
		if (!files) throw new Error('Files is empty');

		const bookImageFile: Express.Multer.File | undefined = files
			? files['book-image']
				? files['book-image'][0]
				: undefined
			: undefined;
		const bookFile: Express.Multer.File | undefined = files
			? files['book-file']
				? files['book-file'][0]
				: undefined
			: undefined;
		const authorImageFile: string | undefined = files
			? files['author-image']
				? files['author-image'][0].filename
				: undefined
			: undefined;

		if (!bookImageFile) throw new Error('image file is undefined');
		if (!bookFile) throw new Error('book file is undefined');
		if (!authorImageFile) throw new Error('author image file is undefined');

		return { bookImageFile, authorImageFile, bookFile };
	}

	public static async validateUpdating(
		id: string,
		updateAuthorDto: UpdateAuthorDto | undefined,
		files: { [key: string]: Express.Multer.File[] } | undefined
	): Promise<{ author: Author; imageFile?: string }> {
		const idParsed: number = parseInt(id, 10);
		if (isNaN(idParsed)) throw new Error('id is invalid');

		if (!updateAuthorDto) throw new Error('Dto is empty');

		const author: Author | undefined = await AuthorRepository.get(idParsed);

		if (!author) throw new Error(`Author with id ${idParsed} does not exist`);

		const { fullName, bornAt, info, diedAt } = updateAuthorDto;

		const imageFile: string | undefined = files
			? files['author-image']
				? files['author-image'][0].filename
				: undefined
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

	public static async validateDeleting(id: string): Promise<Author | never> {
		const idParsed: number = parseInt(id, 10);
		if (isNaN(idParsed)) throw new Error('id is invalid');

		const author: Author | undefined = await AuthorRepository.get(idParsed);

		if (!author) throw new Error(`Author with id ${id} does not exist`);

		return author;
	}
}

export default AuthorValidator;
