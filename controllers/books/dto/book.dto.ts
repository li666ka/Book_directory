import { Genre } from '../../../models/genre.model';

interface BookDto {
	id: number;
	author: {
		id: number;
		fullName: string;
	};
	title: string;
	genres: Genre[];
	imgUrl: string;
	description: string;
	url: string;
	createdAt: string;
}

export default BookDto;
