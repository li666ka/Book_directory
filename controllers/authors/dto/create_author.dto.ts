interface CreateAuthorDto {
	fullName: string;
	bornAt: string;
	diedAt?: string;
	info: string;
	book: {
		title: string;
		genreIds: number[];
		description: string;
	};
}
