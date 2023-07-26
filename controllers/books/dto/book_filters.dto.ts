import { ParsedQs } from 'qs';

interface BookFiltersDto extends ParsedQs {
	searchTitle?: string;
	searchAuthorFullName?: string;
	searchGenreIds?: number[];
}

export default BookFiltersDto;
