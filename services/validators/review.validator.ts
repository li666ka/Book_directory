import { ReviewFiltersDtoParsed } from '../../types/dto_parsed.types';
import { Book, BookRepository } from '../../models/book.model';
import { AppError, HttpCode } from '../../exceptions/app_error';
import { User, UserRepository } from '../../models/user.model';
import { Review, ReviewRepository } from '../../models/review.model';
import { CreateReviewDto } from '../../controllers/reviews/dto/create_review.dto';
import { BooklistItem, BooklistItemRepository } from '../../models/booklist_item.model';
import { UpdateReviewDto } from '../../controllers/reviews/dto/update_review.dto';

class ReviewValidator {
	private static readonly MIN_SCORE = 0;
	private static readonly MAX_SCORE = 10;

	public static async validateGettingAll(reviewsFiltersDto: ReviewFiltersDtoParsed) {
		const { bookId, userId, scoreMin, scoreMax } = reviewsFiltersDto;

		if (bookId) {
			const book: Book | undefined = await BookRepository.get(bookId);
			if (!book)
				new AppError(
					HttpCode.BAD_REQUEST,
					`Book with id ${bookId} does not exist`
				);
		}

		if (userId) {
			const user: User | undefined = await UserRepository.get(userId);
			if (!user)
				new AppError(
					HttpCode.BAD_REQUEST,
					`User with id ${userId} does not exist`
				);
		}

		if (scoreMin) {
			try {
				this.validateScore(scoreMin);
			} catch (err: unknown) {
				if (err instanceof Error)
					new AppError(HttpCode.BAD_REQUEST, `Min score is too small`);
			}
		}

		if (scoreMax) {
			try {
				this.validateScore(scoreMax);
			} catch (err: unknown) {
				if (err instanceof Error)
					new AppError(HttpCode.BAD_REQUEST, `Max score is too big`);
			}
		}
	}

	public static async validateGetting(userId: number, bookId: number): Promise<Review> {
		const review: Review | undefined = await ReviewRepository.get(userId, bookId);

		if (!review)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Review with book id ${bookId} and user id ${userId} does not exist`
			);

		return review;
	}

	public static async validateCreating(
		userId: number,
		bookId: number,
		createReviewDto: CreateReviewDto
	) {
		const review: Review | undefined = await ReviewRepository.get(userId, bookId);

		if (review)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Review with book id ${bookId} and user id ${userId} already exists`
			);

		const booklistItem: BooklistItem | undefined = await BooklistItemRepository.get(
			userId,
			bookId
		);

		if (!booklistItem)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`No booklist item with book id ${bookId} and user id ${userId} for creating review`
			);

		const { score } = createReviewDto;
		try {
			this.validateScore(score);
		} catch (err: unknown) {
			if (err instanceof Error)
				throw new AppError(HttpCode.BAD_REQUEST, 'Score is invalid');
		}
	}

	public static async validateUpdating(
		userId: number,
		bookId: number,
		updateReviewDto: UpdateReviewDto
	): Promise<Review> {
		const review: Review | undefined = await ReviewRepository.get(userId, bookId);

		if (!review)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Review with book id ${bookId} and user id ${userId} does not exist`
			);

		const { score } = updateReviewDto;

		if (score) {
			try {
				this.validateScore(score);
			} catch (err: unknown) {
				if (err instanceof Error)
					throw new AppError(HttpCode.BAD_REQUEST, 'Score is invalid');
			}
		}

		return review;
	}

	private static validateScore(score: number) {
		if (score < this.MIN_SCORE) {
			new Error(`Score is too small`);

			if (score > this.MAX_SCORE) new Error(`Score is too big`);
		}
	}
}

export default ReviewValidator;
