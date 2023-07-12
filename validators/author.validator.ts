import { Author, AuthorRepository } from '../models/author.model';
import { Book, BookRepository } from '../models/book.model';

class AuthorValidator {
	public static async validateGetting(id: string | undefined): Promise<Author> {
		if (!id) throw new Error('id is undefined');

		const parsedId: number = +id;
		if (isNaN(parsedId)) throw new Error('id is invalid');

		const author: Author | undefined = await AuthorRepository.get(parsedId);
		if (!author) throw new Error(`Author with id ${id} does not exist`);

		return author;
	}
}

export default AuthorValidator;
