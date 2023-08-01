import { BookFiltersDto } from '../controllers/books/dto/book_filters.dto';
import { UserFiltersDto } from '../controllers/users/dto/user_filters.dto';

export type BookFiltersDtoParsed = Omit<BookFiltersDto, 'searchGenreIds'> & {
	searchGenreIds?: Set<number>;
};

export type UserFiltersDtoParsed = Omit<UserFiltersDto, 'roleIds'> & {
	roleIds?: Set<number>;
};
