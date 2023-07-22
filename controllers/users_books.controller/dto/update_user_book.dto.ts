interface UpdateUserBookDto {
	statusId?: number;
	review?: { score: number; comment?: string };
}

export default UpdateUserBookDto;
