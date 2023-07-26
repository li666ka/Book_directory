interface CreateBookDto {
	authorId: number;
	title: string;
	description: string;
	genreIds: Set<number>;
}

export default CreateBookDto;
