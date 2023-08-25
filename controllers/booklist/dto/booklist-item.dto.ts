import { UserDto } from '../../users/dto/user.dto';
import { BookDto } from '../../books/dto/book.dto';
import { StatusDto } from '../../statuses/dto/status.dto';
import { ReviewDto } from '../../reviews/dto/review.dto';

export interface BooklistItemDto {
	user: BooklistItemDto_User;
	book: BooklistItemDto_Book;
	status: StatusDto;
	review: BooklistItemDto_Review | null;
}

export type BooklistItemDto_User = Pick<UserDto, 'id' | 'username'>;
export type BooklistItemDto_Book = Pick<
	BookDto,
	'id' | 'author' | 'title' | 'genres' | 'imageFile'
>;
export type BooklistItemDto_Review = Pick<ReviewDto, 'score' | 'comment' | 'createdAt'>;
