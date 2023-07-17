interface UpdateBookDto {
	authorId?: number;
	title?: string;
	description?: string;
	genreIds?: number[];
}

export default UpdateBookDto;
