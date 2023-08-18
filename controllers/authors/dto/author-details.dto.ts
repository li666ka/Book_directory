import { AuthorDto } from './author.dto';
import { BookDto } from '../../books/dto/book.dto';

export interface AuthorDetailsDto extends AuthorDto {
	bornAt: string;
	diedAt: string | null;
	info: string;
	books: Pick<BookDto, 'id' | 'title' | 'genres' | 'imageFile'>[];
}
