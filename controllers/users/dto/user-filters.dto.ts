import { ParsedQs } from 'qs';

export interface UserFiltersDto extends ParsedQs {
	searchUsername?: string;
	roleIds?: string[];
}
