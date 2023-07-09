interface CreateBookDto {
	authorId: number;
	title: string;
	description: string;
	genresIds: number[];
}

export default CreateBookDto;
