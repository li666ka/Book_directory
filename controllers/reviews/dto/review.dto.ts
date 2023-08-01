import { UserDto } from '../../users/dto/user.dto';
import { BookDto } from '../../books/dto/book.dto';

export interface ReviewDto {
	user: Pick<UserDto, 'id' | 'username'>;
	book: Pick<BookDto, 'id' | 'author' | 'title'>;
	score: number;
	comment: string | null;
	createdAt: string;
}
