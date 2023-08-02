import { ParsedQs } from 'qs';

export interface ReviewFiltersDto extends ParsedQs {
	userId?: string;
	bookId?: string;
	scoreMin?: string;
	scoreMax?: string;
}
