import { CreateBooklistItemDto } from '../controllers/booklist-items/dto/create-booklist-item.dto';
import { UpdateBooklistItemDto } from '../controllers/booklist-items/dto/update-booklist-item.dto';
import { BooklistItemDto } from '../controllers/booklist-items/dto/booklist-item.dto';
import { BookDto } from '../controllers/books/dto/book.dto';

import { BooklistItem, BooklistItemRepository } from '../models/booklist-item.model';
import { Status, StatusRepository } from '../models/status.model';
import { Book, BookRepository } from '../models/book.model';
import { User, UserRepository } from '../models/user.model';

import BooksService from './books.service';
import BooklistItemDataValidator from '../validators/data/booklist-item.data.validator';
import { AppError, HttpCode } from '../exceptions/app-error';
import { ReviewRepository } from '../models/review.model';
import ReviewsService from './reviews.service';

class BooklistItemsService {
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
	}

	public static async delete(userId: number, bookId: number) {
		await BooklistItemDataValidator.validateDeleting(userId, bookId);
		await BooklistItemRepository.delete(userId, bookId);
	}

	public static async parseToDto(booklistItem: BooklistItem): Promise<BooklistItemDto> {
		const { user_id, book_id, status_id } = booklistItem;

		const user = (await UserRepository.get(user_id)) as User;
		const book = (await BookRepository.get(book_id)) as Book;
		const status = (await StatusRepository.get(status_id)) as Status;
		const review = await ReviewRepository.get(user_id, book_id);

		const bookDto: BookDto = await BooksService.parseToDto(book);

		return {
			user: { id: user.id, username: user.username },
			book: {
				id: bookDto.id,
				author: bookDto.author,
				title: bookDto.title,
				genres: bookDto.genres,
				imageFile: bookDto.imageFile,
			},
			status: { id: status.id, name: status.name },
			review: review
				? {
						score: review.score,
						comment: review.comment,
						createdAt: review.created_at,
				  }
				: null,
		} as BooklistItemDto;
	}
}

export default BooklistItemsService;
