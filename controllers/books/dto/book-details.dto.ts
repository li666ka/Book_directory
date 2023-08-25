import { BookDto } from './book.dto';
import { ReviewDto } from '../../reviews/dto/review.dto';

export interface BookDetailsDto extends BookDto {
	reviews: BookDetailsDto_Review[];
	averageScore: number;
	additionNumber: number;
}

export type BookDetailsDto_Review = Omit<ReviewDto, 'book'>;
