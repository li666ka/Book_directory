interface AuthorDto {
	id: number;
	fullName: string;
	bornAt: string;
	diedAt?: string;
	imgUrl: string;
	info: string;
	createdAt: string;
}

export default AuthorDto;
