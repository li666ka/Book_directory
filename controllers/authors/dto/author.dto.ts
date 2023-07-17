interface AuthorDto {
	id: number;
	fullName: string;
	bornAt: string;
	diedAt: string | null;
	info: string;
	imageFile: string;
	books: {
		id: number;
		title: string;
		genres: {
			id: number;
			name: string;
		}[];
		imageFile: string;
	}[];
	createdAt: string;
}

export default AuthorDto;
