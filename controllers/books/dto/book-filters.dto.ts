import { ParsedQs } from 'qs';

export interface BookFiltersDto extends ParsedQs {
	searchTitle?: string;
	searchAuthorFullName?: string;
	searchGenreIds?: string[];
}
