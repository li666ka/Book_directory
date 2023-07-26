import { ParsedQs } from 'qs';

interface BookFiltersDto extends ParsedQs {
	searchTitle?: string;
	searchAuthorFullName?: string;
	searchGenreIds?: Set<number>;
}

export default BookFiltersDto;
