interface CreateBookDto {
	authorId: number;
	title: string;
	description: string;
	genreIds: number[];
}

export default CreateBookDto;
