interface BookDto {
	id: number;
	author: {
		id: number;
		fullName: string;
	};
	title: string;
	genres: {
		id: number;
		name: string;
	}[];
	description: string;
	imageFile: string;
	bookFile: string;
	createdAt: string;
}

export default BookDto;
