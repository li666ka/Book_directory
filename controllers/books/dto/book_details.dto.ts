import BookDto from './book.dto';

interface BookDetailsDto extends BookDto {
	reviews: {
		userId: number;
		score: number;
		comment: string | null;
		createdAt: string;
	}[];
	averageScore: number;
	additionNumber: number;
}

export default BookDetailsDto;
