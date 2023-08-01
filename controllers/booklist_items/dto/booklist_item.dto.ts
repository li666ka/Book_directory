import { UserDto } from '../../users/dto/user.dto';
import { BookDto } from '../../books/dto/book.dto';
import { StatusDto } from '../../statuses/dto/status.dto';
import { ReviewDto } from '../../reviews/dto/review.dto';

export interface BooklistItemDto {
	user: Pick<UserDto, 'id' | 'username'>;
	book: Pick<BookDto, 'id' | 'author' | 'title' | 'genres' | 'imageFile'>;
	status: StatusDto;
	review: Pick<ReviewDto, 'score' | 'comment' | 'createdAt'> | null;
}
