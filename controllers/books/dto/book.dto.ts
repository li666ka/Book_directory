import { GenreDto } from '../../genres/dto/genre.dto';
import { AuthorDto } from '../../authors/dto/author.dto';

export interface BookDto {
	id: number;
	author: BookDto_Author;
	title: string;
	genres: BookDto_Genre[];
	description: string;
	imageFile: string | null;
	bookFile: string | null;
	createdAt: string;
}

export type BookDto_Author = Pick<AuthorDto, 'id' | 'fullName'>;
export type BookDto_Genre = Pick<GenreDto, 'id' | 'name'>;
