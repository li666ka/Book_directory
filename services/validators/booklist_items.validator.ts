import { CreateBooklistItemDto } from '../../controllers/booklist_items/dto/create_booklist_item.dto';
import { User, UserRepository } from '../../models/user.model';
import { Book, BookRepository } from '../../models/book.model';
import { AppError, HttpCode } from '../../exceptions/app_error';
import { Status, StatusRepository } from '../../models/status.model';
import { BooklistItem, BooklistItemRepository } from '../../models/booklist_item.model';
import { UpdateBooklistItemDto } from '../../controllers/booklist_items/dto/update_booklist_item.dto';

class BooklistItemsValidator {
	public static async validateCreating(
		userId: number,
		bookId: number,
		createBooklistItemDto: CreateBooklistItemDto
	) {
		const user: User | undefined = await UserRepository.get(userId);

		if (!user)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`User with id ${userId} does not exists`
			);

		const book: Book | undefined = await BookRepository.get(bookId);

		if (!book)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Book with id ${bookId} does not exists`
			);

		const { statusId } = createBooklistItemDto;

		const status: Status | undefined = await StatusRepository.get(statusId);

		if (!status)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Status with id ${statusId} does not exists`
			);

		const booklistItemSame: BooklistItem | undefined =
			await BooklistItemRepository.get(userId, bookId);

		if (booklistItemSame)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Booklist item with user id ${userId} and ${bookId} already exists`
			);
	}

	public static async validateUpdating(
		userId: number,
		bookId: number,
		updateBooklistDto: UpdateBooklistItemDto
	) {
		const booklistItem: BooklistItem | undefined = await BooklistItemRepository.get(
			userId,
			bookId
		);

		if (!booklistItem)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Booklist item with user id ${userId} and ${bookId} does not exist`
			);

		const { statusId } = updateBooklistDto;

		const status: Status | undefined = await StatusRepository.get(statusId);

		if (!status)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Status with id ${statusId} does not exists`
			);
	}

	public static async validateDeleting(userId: number, bookId: number) {
		const booklistItem: BooklistItem | undefined = await BooklistItemRepository.get(
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

export default BooklistItemsValidator;
