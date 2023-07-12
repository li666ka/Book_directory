import AuthorsFiltersDto from '../controllers/authors/dto/authors_filters.dto';
import AuthorDto from '../controllers/authors/dto/author.dto';
import { Author, AuthorRepository } from '../models/author.model';

class AuthorsService {
	public static async find(
		authorsFilters: AuthorsFiltersDto | undefined
	): Promise<AuthorDto[] | never> {
		let authors: Author[] = await AuthorRepository.getAll();

		if (authorsFilters) {
			const { searchFullName } = authorsFilters;

			if (searchFullName) {
				authors = await this.filterByFullName(authors, searchFullName);
				// console.log(authors);
			}
		}

		const authorsDto: AuthorDto[] = [];
		for (const author of authors) {
			const authorDto: AuthorDto = await this.parseToDto(author);
			authorsDto.push(authorDto);
		}

		return authorsDto;
	}

	private static async filterByFullName(
		authors: Author[],
		fullName: string
	): Promise<Author[]> {
		authors = authors.filter((author) => {
			const regExp = new RegExp(fullName, 'i');
			return regExp.test(author.full_name);
		});
		return authors;
	}

	private static parseToDto(author: Author): AuthorDto {
		return {
			id: author.id,
			fullName: author.full_name,
			bornAt: author.born_at,
			diedAt: author.died_at,
			imgUrl: author.img_url,
			info: author.info,
			createdAt: author.created_at,
		};
	}
}

export default AuthorsService;
