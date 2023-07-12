interface UpdateBookDto {
	authorId?: number;
	title?: string;
	description?: string;
	genresIds?: number[];
}

export default UpdateBookDto;
