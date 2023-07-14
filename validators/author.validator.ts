import { Author, AuthorRepository } from '../models/author.model';
import { Book, BookRepository } from '../models/book.model';
import { Genre, GenreRepository } from '../models/genre.model';
import update_bookDto from '../controllers/books/dto/update_book.dto';

class AuthorValidator {
	public static async validateGetting(id: string | undefined): Promise<Author> {
		if (!id) throw new Error('id is undefined');

		const parsedId: number = +id;
		if (isNaN(parsedId)) throw new Error('id is invalid');

		const author: Author | undefined = await AuthorRepository.get(parsedId);
		if (!author) throw new Error(`Author with id ${id} does not exist`);

		return author;
	}

	public static async validateCreating(
		createAuthorDto: CreateAuthorDto | undefined,
		files: { [key: string]: Express.Multer.File[] } | undefined
	): Promise<{
		bookImageFile: Express.Multer.File;
		bookFile: Express.Multer.File;
		authorImageFile: Express.Multer.File;
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

		const { title, genresIds, description } = book;

		if (!title) throw new Error('title is undefined');
		if (!genresIds) throw new Error('genresIds is undefined');
		if (!description) throw new Error('description is undefined');

		for (const genreId of genresIds) {
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
		const authorImageFile: Express.Multer.File | undefined = files
			? files['author-image']
				? files['author-image'][0]
				: undefined
			: undefined;

		if (!bookImageFile) throw new Error('image file is undefined');
		if (!bookFile) throw new Error('book file is undefined');
		if (!authorImageFile) throw new Error('author image file is undefined');

		return { bookImageFile, authorImageFile, bookFile };
	}

	public static async validateUpdating(
		updateAuthorDto: UpdateAuthorDto,
		files: { [key: string]: Express.Multer.File[] } | undefined
	): Promise<{ imageFile: Express.Multer.File }> {
		if (!updateAuthorDto) throw new Error('Dto is empty');

		const { fullName, bornAt, info, diedAt } = updateAuthorDto;

		const imageFile: Express.Multer.File | undefined = files
			? files['author-image']
				? files['author-image'][0]
				: undefined
			: undefined;

		if (!(fullName || bornAt || diedAt || info || imageFile))
			throw new Error('No properties for updating');

		if (fullName) {
			const author: Author | undefined = (await AuthorRepository.getAll()).find(
				(author) => author.full_name === fullName
			);

			if (author)
				throw new Error(`Author with full name ${fullName} already exists`);
		}
	}
}

export default AuthorValidator;
