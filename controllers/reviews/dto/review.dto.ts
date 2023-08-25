import { UserDto } from '../../users/dto/user.dto';
import { BookDto } from '../../books/dto/book.dto';

export interface ReviewDto {
	user: ReviewDto_User;
	book: ReviewDto_Book;
	score: number;
	comment: string | null;
	createdAt: string;
}

export type ReviewDto_User = Pick<UserDto, 'id' | 'username'>;
export type ReviewDto_Book = Pick<BookDto, 'id' | 'author' | 'title'>;
