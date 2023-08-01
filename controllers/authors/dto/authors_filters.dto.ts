import { ParsedQs } from 'qs';

export interface AuthorsFiltersDto extends ParsedQs {
	searchFullName?: string;
}
