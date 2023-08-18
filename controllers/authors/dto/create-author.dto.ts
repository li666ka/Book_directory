export interface CreateAuthorDto {
	fullName: string;
	bornAt: string;
	diedAt: string | null;
	info: string;
	book: {
		title: string;
		genreIds: Set<number>;
		description: string;
	};
}
