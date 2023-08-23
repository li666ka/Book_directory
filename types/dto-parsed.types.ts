import { BookFiltersDto } from '../controllers/books/dto/book-filters.dto';
import { UserFiltersDto } from '../controllers/users/dto/user-filters.dto';

export type BookFiltersDtoParsed = Omit<BookFiltersDto, 'searchGenreIds'> & {
	searchGenreIds?: Set<number>;
};

export type UserFiltersDtoParsed = Omit<UserFiltersDto, 'roleIds'> & {
	roleIds?: Set<number>;
};

export type ReviewFiltersDtoParsed = {
	userId?: number;
	bookId?: number;
	scoreMin?: number;
	scoreMax?: number;
};
