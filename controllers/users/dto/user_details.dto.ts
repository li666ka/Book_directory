import UserDto from './user.dto';

interface UserDetailsDto extends UserDto {
	booklist: {
		bookId: number;
		bookTitle: string;
		author: { id: number; fullName: string };
		genres: { id: number; name: string }[];
		status: { id: number; name: string };
		review: { score: number; comment: string | null; createdAt: string } | null;
	}[];
}

export default UserDetailsDto;
