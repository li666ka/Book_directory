import { createConnection } from 'mysql2';
import { connectionConfig } from '../configs/db.config';
import { AuthorRepository } from '../models/author.model';
import { BookRepository } from '../models/book.model';
import { BookGenreRepository } from '../models/book-genre.model';
import { BooklistItemRepository } from '../models/booklist-item.model';
import { GenreRepository } from '../models/genre.model';
import { ReviewRepository } from '../models/review.model';
import { RoleRepository } from '../models/role.model';
import { StatusRepository } from '../models/status.model';
import { UserRepository } from '../models/user.model';

export const DB_CONNECTION = createConnection(connectionConfig);

export async function storeData() {
	await Promise.all([
		AuthorRepository.store(),
		BookRepository.store(),
		BookGenreRepository.store(),
		BooklistItemRepository.store(),
		GenreRepository.store(),
		ReviewRepository.store(),
		RoleRepository.store(),
		StatusRepository.store(),
		UserRepository.store(),
	]);
}
