import { GenreDto } from '../../genres/dto/genre.dto';
import { AuthorDto } from '../../authors/dto/author.dto';

export interface BookDto {
	id: number;
	author: Pick<AuthorDto, 'id' | 'fullName'>;
	title: string;
	genres: GenreDto[];
	description: string;
	imageFile: string | null;
	bookFile: string | null;
	createdAt: string;
}
