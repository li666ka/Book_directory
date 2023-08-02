import {
	BookFiltersDtoParsed,
	ReviewFiltersDtoParsed,
	UserFiltersDtoParsed,
} from '../types/dto_parsed.types';
import { isInteger, isIntSet } from '../guards/_base.guards';
import { AppError, HttpCode } from '../exceptions/app_error';
import { BookFiltersDto } from '../controllers/books/dto/book_filters.dto';
import { UserFiltersDto } from '../controllers/users/dto/user_filters.dto';
import { ReviewFiltersDto } from '../controllers/reviews/dto/review_filters.dto';

export function parseToInt(value: string): number {
	const parsedToNumber = Number(value); // can be `float` or parsed by another radix
	const parsedToInt = parseInt(value, 10);
	const parsed =
		isInteger(parsedToNumber) && parsedToInt === parsedToNumber ? parsedToInt : NaN;

	if (isNaN(parsed))
		throw new AppError(HttpCode.BAD_REQUEST, 'Can`t be parsed to integer');
	return parsed;
}

export function parseBookFiltersDto(
	bookFiltersDto: BookFiltersDto
): BookFiltersDtoParsed {
	if (Object.keys(bookFiltersDto).length === 0)
		return bookFiltersDto as BookFiltersDtoParsed;

	const { searchGenreIds: genreIds } = bookFiltersDto;
	if (!genreIds) return bookFiltersDto as BookFiltersDtoParsed;

	const genreIdsParsed = genreIds.map((genreId) => {
		const genreIdParsed = parseToInt(genreId);
		if (isNaN(genreIdParsed))
			throw new Error(`'genreId' ${genreId} cannot be parsed to int`);
		return genreIdParsed;
	});

	if (isIntSet(genreIdsParsed)) {
		const parsed = bookFiltersDto as BookFiltersDtoParsed;
		parsed.searchGenreIds = genreIdsParsed;
		return parsed;
	} else {
		throw new Error("'searchGenreIds' is not a Set");
	}
}

export function parseUserFiltersDto(
	userFiltersDto: UserFiltersDto
): UserFiltersDtoParsed {
	if (Object.keys(userFiltersDto).length === 0)
		return userFiltersDto as UserFiltersDtoParsed;

	const { roleIds } = userFiltersDto;

	let roleIdsParsed = undefined;

	if (roleIds) {
		roleIdsParsed = roleIds.map((roleId) => {
			const roleIdParsed = parseToInt(roleId);
			if (isNaN(roleIdParsed))
				throw new Error(`'genreId' ${roleId} cannot be parsed to int`);
			return roleIdParsed;
		});
		if (!isIntSet(roleIdsParsed)) throw new Error("'roleIds' is not a Set");
	}

	const parsed = userFiltersDto as UserFiltersDtoParsed;
	parsed.roleIds = roleIdsParsed;
	return parsed;
}

export function parseReviewFiltersDto(
	reviewFiltersDto: ReviewFiltersDto
): ReviewFiltersDtoParsed {
	const { userId, bookId, scoreMin, scoreMax } = reviewFiltersDto;
	return {
		userId: userId ? parseToInt(userId) : undefined,
		bookId: bookId ? parseToInt(bookId) : undefined,
		scoreMin: scoreMin ? parseToInt(scoreMin) : undefined,
		scoreMax: scoreMax ? parseToInt(scoreMax) : undefined,
	};
}
