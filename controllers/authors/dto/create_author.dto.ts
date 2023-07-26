interface CreateAuthorDto {
	fullName: string;
	bornAt: string;
	diedAt?: string;
	info: string;
	book: {
		title: string;
		genreIds: Set<number>;
		description: string;
	};
}

export default CreateAuthorDto;
