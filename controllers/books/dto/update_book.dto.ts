export interface UpdateBookDto {
	authorId?: number;
	title?: string;
	description?: string;
	genreIds?: Set<number>;
}
