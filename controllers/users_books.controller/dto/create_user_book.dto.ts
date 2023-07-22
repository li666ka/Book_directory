interface CreateUserBookDto {
	statusId: number;
	review?: { score: number; comment?: string };
}

export default CreateUserBookDto;
