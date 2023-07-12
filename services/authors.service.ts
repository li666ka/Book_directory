import AuthorsFiltersDto from '../controllers/authors/dto/authors_filters.dto';
import AuthorDto from '../controllers/authors/dto/author.dto';
import { Author, AuthorRepository } from '../models/author.model';
import { Book, BookRepository } from '../models/book.model';
import AuthorValidator from '../validators/author.validator';
import BooksService from './books.service';
import BookDto from '../controllers/books/dto/book.dto';

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

	public static async findOne(id: string | undefined): Promise<AuthorDto | never> {
		const author: Author = await AuthorValidator.validateGetting(id);
		return this.parseToDto(author);
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
