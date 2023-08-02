import { ReviewFiltersDto } from '../controllers/reviews/dto/review_filters.dto';
import { isInteger, isNull, isObject, isString } from './_base.guards';
import { CreateReviewDto } from '../controllers/reviews/dto/create_review.dto';
import { UpdateReviewDto } from '../controllers/reviews/dto/update_review.dto';

export function isReviewFiltersDto(input: any): input is ReviewFiltersDto {
	return (
		isObject(input) &&
		(('userId' in input ? isString(input.userId) : true) ||
			('bookId' in input ? isString(input.bookId) : true) ||
			('scoreMin' in input ? isString(input.scoreMin) : true) ||
			('scoreMax' in input ? isString(input.scoreMax) : true))
	);
}

export function isCreateReviewDto(input: any): input is CreateReviewDto {
	return (
		isObject(input) &&
		'score' in input &&
		isInteger(input.score) &&
		'comment' in input &&
		(isString(input.comment) || isNull(input.comment))
	);
}

export function isUpdateReviewDto(input: any): input is UpdateReviewDto {
	return (
		isObject(input) &&
		(('score' in input && isInteger(input.score)) ||
			('comment' in input && (isString(input.comment) || isNull(input.comment))))
	);
}
