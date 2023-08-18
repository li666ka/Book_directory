import { ParsedQs } from 'qs';

export interface GenreFiltersDto extends ParsedQs {
	searchName?: string;
}
