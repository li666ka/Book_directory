import AuthorDto from './author.dto';

interface AuthorDetailsDto extends AuthorDto {
	bornAt: string;
	diedAt: string | null;
	info: string;
	books: {
		id: number;
		title: string;
		genres: {
			id: number;
			name: string;
		}[];
		imageFile: string;
	}[];
}

export default AuthorDetailsDto;
