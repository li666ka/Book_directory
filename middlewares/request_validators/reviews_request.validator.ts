import { ReviewsRequest } from '../../types/request.types';
import { Request, Response } from 'express';
import {
	isCreateReviewDto,
	isReviewFiltersDto,
	isUpdateReviewDto,
} from '../../guards/reviews_dto.guards';
import { AppError, HttpCode } from '../../exceptions/app_error';

class ReviewsRequestValidator {
	public static validate(req: ReviewsRequest) {
		switch (req) {
			case 'reviews-get-all':
				return this.validateGetAll;
			case 'reviews-create':
				return this.validateCreate;
			case 'reviews-update':
				return this.validateUpdate;
			default:
				return (req: Request, res: Response, next: any) => {
					next();
				};
		}
	}

	private static validateGetAll(req: Request, res: Response, next: any) {
		const { query } = req;
		if (!isReviewFiltersDto(query))
			throw new AppError(HttpCode.BAD_REQUEST, 'Incorrect ReviewFiltersDto');
		next();
	}

	private static validateCreate(req: Request, res: Response, next: any) {
		const { body } = req;
		if (!isCreateReviewDto(body))
			throw new AppError(HttpCode.BAD_REQUEST, 'Incorrect CreateReviewDto');
		next();
	}

	private static validateUpdate(req: Request, res: Response, next: any) {
		const { body } = req;
		if (!isUpdateReviewDto(body))
			throw new AppError(HttpCode.BAD_REQUEST, 'Incorrect UpdateReviewDto');
		next();
	}
}

export default ReviewsRequestValidator;
