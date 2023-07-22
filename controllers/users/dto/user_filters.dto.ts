import { ParsedQs } from 'qs';

interface UserFiltersDto extends ParsedQs {
	searchUsername?: string;
	roleIds?: string[];
}

export default UserFiltersDto;
