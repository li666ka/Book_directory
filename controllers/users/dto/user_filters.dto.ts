import { ParsedQs } from 'qs';

interface UserFiltersDto extends ParsedQs {
	searchUsername?: string;
	roleIds?: number[];
}

export default UserFiltersDto;
