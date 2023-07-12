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
	imgUrl: string;
	description: string;
	url: string;
	createdAt: string;
}

export default BookDto;
