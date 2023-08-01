import { BookDto } from './book.dto';
import { ReviewDto } from '../../reviews/dto/review.dto';

export interface BookDetailsDto extends BookDto {
	reviews: Omit<ReviewDto, 'book'>[];
	averageScore: number;
	additionNumber: number;
}
