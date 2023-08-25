import { CreateBooklistItemDto } from '../../controllers/booklist/dto/create-booklist-item.dto';
import { User, UserRepository } from '../../models/user.model';
import { Book, BookRepository } from '../../models/book.model';
import { AppError, HttpCode } from '../../exceptions/app-error';
import { Status, StatusRepository } from '../../models/status.model';
import { BooklistItem, BooklistItemRepository } from '../../models/booklist-item.model';
import { UpdateBooklistItemDto } from '../../controllers/booklist/dto/update-booklist-item.dto';
import UsersService from '../../services/users.service';
import usersService from '../../services/users.service';
import BooksService from '../../services/books.service';
import StatusesService from '../../services/statuses.service';
import BooklistService from '../../services/booklist.service';

class BooklistItemDataValidator {
	public static validateCreating(
		userId: number,
		bookId: number,
		createBooklistItemDto: CreateBooklistItemDto
	) {
		const user: User | undefined = UsersService.getById(userId);

		if (!user)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`User with id ${userId} does not exists`
			);

		const book: Book | undefined = BooksService.getById(bookId);

		if (!book)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Book with id ${bookId} does not exists`
			);

		const { statusId } = createBooklistItemDto;

		const status: Status | undefined = StatusesService.getById(statusId);

		if (!status)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Status with id ${statusId} does not exists`
			);

		const booklistItemSame: BooklistItem | undefined = BooklistService.getByIds(
			userId,
			bookId
		);

		if (booklistItemSame)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Booklist item with user id ${userId} and ${bookId} already exists`
			);
	}

	public static validateUpdating(
		userId: number,
		bookId: number,
		updateBooklistDto: UpdateBooklistItemDto
	) {
		const booklistItem: BooklistItem | undefined = BooklistService.getByIds(
			userId,
			bookId
		);

		if (!booklistItem)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Booklist item with user id ${userId} and ${bookId} does not exist`
			);

		const { statusId } = updateBooklistDto;

		const status: Status | undefined = StatusesService.getById(statusId);

		if (!status)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Status with id ${statusId} does not exists`
			);
	}

	public static validateDeleting(userId: number, bookId: number) {
		const booklistItem: BooklistItem | undefined = BooklistService.getByIds(
			userId,
			bookId
		);

		if (!booklistItem)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Booklist item with user id ${userId} and ${bookId} does not exist`
			);
	}
}

export default BooklistItemDataValidator;
