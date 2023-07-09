import CreateBookDto from '../controllers/books/dto/create_book.dto';
import { Author, AuthorRepository } from '../models/author.model';
import { Genre, GenreRepository } from '../models/genre.model';
import { Book, BookRepository } from '../models/book.model';
import DeleteBookDto from '../controllers/books/dto/delete_book.dto';

class BookValidator {
	public static async validateCreationData(
		createBookDto: CreateBookDto | undefined,
		files:
			| {
					[key: string]: Express.Multer.File[];
			  }
			| Express.Multer.File[]
			| undefined
	): Promise<
		| {
				createBookDto: CreateBookDto;
				imageFile: Express.Multer.File;
				bookFile: Express.Multer.File;
				author: Author;
		  }
		| never
	> {
		if (!createBookDto) throw new Error('Dto is empty');

		const { authorId, title, description, genresIds } = createBookDto;

		if (!authorId) throw new Error('authorId is undefined');
		if (!title) throw new Error('title is undefined');
		if (!description) throw new Error('description is undefined');
		if (!genresIds) throw new Error('genresIds is undefined');
		if (genresIds.length === 0) throw new Error('genresIds is empty');

		for (let i = 0; i < genresIds.length; ++i) {
			const genreId: number = genresIds[i];
			const genre: Genre | undefined = await GenreRepository.get(genreId);

			if (!genre) throw new Error(`Genre with id ${genreId} does not exist`);
		}

		if (!files) throw new Error('Files is empty');

		// @ts-ignore
		const imageFile: Express.Multer.File | undefined = files['book-image'][0];
		// @ts-ignore
		const bookFile: Express.Multer.File | undefined = files['book-file'][0];

		if (!imageFile) throw new Error('image file is undefined');
		if (!bookFile) throw new Error('book file is undefined');

		const author: Author | undefined = await AuthorRepository.get(authorId);

		if (!author) throw new Error(`Author with id ${authorId} does not exist`);

		return { createBookDto, imageFile, bookFile, author };
	}

	public static async validateDeletingData(
		deleteBookDto: DeleteBookDto | undefined
	): Promise<Book | never> {
		if (!deleteBookDto) throw new Error('Dto is empty');

		const { id } = deleteBookDto;
		if (!id) throw new Error('id is undefined');

		const book: Book | undefined = await BookRepository.get(id);

		if (!book) throw new Error(`Book with id ${id} does not exist`);

		return book;
	}
}

export default BookValidator;
