import { CreateBooklistItemDto } from '../controllers/booklist/dto/create-booklist-item.dto';
import { UpdateBooklistItemDto } from '../controllers/booklist/dto/update-booklist-item.dto';
import { BooklistItemDto } from '../controllers/booklist/dto/booklist-item.dto';

import { BooklistItem, BooklistItemRepository } from '../models/booklist-item.model';
import { Status } from '../models/status.model';
import { Book } from '../models/book.model';
import { User } from '../models/user.model';
import { Author } from '../models/author.model';

import BooklistItemDataValidator from '../validators/data/booklist-item.data.validator';
import { AppError, HttpCode } from '../exceptions/app-error';

import ReviewsService from './reviews.service';
import UsersService from './users.service';
import StatusesService from './statuses.service';
import AuthorsService from './authors.service';
import BooksService from './books.service';

class BooklistService {
	public static getByIds(userId: number, bookId: number): BooklistItem | undefined {
		return BooklistItemRepository.cache.find(
			(item) => item.user_id === userId && item.book_id === bookId
		);
	}

	public static async create(
		userId: number,
		bookId: number,
		createBooklistItemDto: CreateBooklistItemDto
	): Promise<BooklistItemDto> {
		await BooklistItemDataValidator.validateCreating(
			userId,
			bookId,
			createBooklistItemDto
		);
		const { statusId } = createBooklistItemDto;
		await BooklistItemRepository.create(userId, bookId, statusId);

		const newBooklistItem: BooklistItem | undefined =
			await BooklistItemRepository.get(userId, bookId);

		if (!newBooklistItem)
			throw new AppError(
				HttpCode.INTERNAL_SERVER_ERROR,
				'Creating new booklist item is failed'
			);

		await BooklistItemRepository.store();
		return this.parseToDto(newBooklistItem);
	}

	public static async update(
		userId: number,
		bookId: number,
		updateBooklistDto: UpdateBooklistItemDto
	) {
		await BooklistItemDataValidator.validateUpdating(
			userId,
			bookId,
			updateBooklistDto
		);
		const { statusId } = updateBooklistDto;
		await BooklistItemRepository.update(statusId, userId, bookId);
		await BooklistItemRepository.store();
	}

	public static async delete(userId: number, bookId: number) {
		await BooklistItemDataValidator.validateDeleting(userId, bookId);
		await BooklistItemRepository.delete(userId, bookId);
		await BooklistItemRepository.store();
	}

	public static parseToDto(booklistItem: BooklistItem): BooklistItemDto {
		const { user_id, book_id, status_id } = booklistItem;

		const user = UsersService.getById(user_id) as User;
		const book = BooksService.getById(book_id) as Book;
		const status = StatusesService.getById(status_id) as Status;
		const review = ReviewsService.getByIds(user_id, book_id);
		const author = AuthorsService.getById(book.author_id) as Author;

		const bookDto = {
			id: book.id,
			author: { id: author.id, fullName: author.full_name },
			title: book.title,
			genres: BooksService.getGenres(book.id),
			imageFile: book.imageFile,
		};

		return {
			user: { id: user.id, username: user.username },
			book: bookDto,
			status: { id: status.id, name: status.name },
			review: review
				? {
						score: review.score,
						comment: review.comment,
						createdAt: review.created_at,
				  }
				: null,
		};
	}
}

export default BooklistService;
