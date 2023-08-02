import { Request, Response } from 'express';
import { ReviewDto } from './dto/review.dto';
import { ReviewFiltersDto } from './dto/review_filters.dto';
import { parseReviewFiltersDto, parseToInt } from '../../utils/parsing.util';
import ReviewsService from '../../services/reviews.service';
import { HttpCode } from '../../exceptions/app_error';
import { CreateReviewDto } from './dto/create_review.dto';
import { UpdateReviewDto } from './dto/update_review.dto';
import { ReviewRepository } from '../../models/review.model';

class ReviewsController {
	public static async getAll(
		req: Request<never, never, never, ReviewFiltersDto>,
		res: Response<ReviewDto[]>
	): Promise<void> {
		const { query } = req;
		const reviewFiltersParsed = parseReviewFiltersDto(query);
		const reviews: ReviewDto[] = await ReviewsService.find(reviewFiltersParsed);
		res.json(reviews);
	}

	public static async get(
		req: Request<{ userId: string; bookId: string }>,
		res: Response<ReviewDto>
	): Promise<void> {
		const { bookId, userId } = req.params;
		const bookIdParsed = parseToInt(bookId),
			userIdParsed = parseToInt(userId);
		const review: ReviewDto = await ReviewsService.findOne(
			bookIdParsed,
			userIdParsed
		);
		res.json(review);
	}

	public static async create(
		req: Request<{ userId: string; bookId: string }, never, CreateReviewDto>,
		res: Response<ReviewDto>
	) {
		const { bookId, userId } = req.params;
		const bookIdParsed = parseToInt(bookId),
			userIdParsed = parseToInt(userId);
		const { body } = req;
		const newReview: ReviewDto = await ReviewsService.create(
			userIdParsed,
			bookIdParsed,
			body
		);
		res.json(newReview);
	}

	public static async update(
		req: Request<{ userId: string; bookId: string }, never, UpdateReviewDto>,
		res: Response
	) {
		const { bookId, userId } = req.params;
		const bookIdParsed = parseToInt(bookId),
			userIdParsed = parseToInt(userId);
		const { body } = req;
		await ReviewsService.update(bookIdParsed, userIdParsed, body);
	}

	public static async delete(
		req: Request<{ userId: string; bookId: string }>,
		res: Response
	) {
		const { bookId, userId } = req.params;
		const bookIdParsed = parseToInt(bookId),
			userIdParsed = parseToInt(userId);

		await ReviewRepository.delete(userIdParsed, bookIdParsed);
		res.sendStatus(HttpCode.OK);
	}
}

export default ReviewsController;
