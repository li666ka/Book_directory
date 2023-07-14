interface AuthorDto {
	id: number;
	fullName: string;
	bornAt: string;
	diedAt?: string;
	imgUrl: string;
	info: string;
	books: {
		id: number;
		title: string;
		genres: {
			id: number;
			name: string;
		}[];
		imgUrl: string;
	}[];
	createdAt: string;
}

export default AuthorDto;
