interface CreateAuthorDto {
	fullName: string;
	bornAt: string;
	diedAt?: string;
	info: string;
	book: {
		title: string;
		genresIds: number[];
		description: string;
	};
}
