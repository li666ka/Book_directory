import { ParsedQs } from 'qs';

interface AuthorsFiltersDto extends ParsedQs {
	searchFullName?: string;
}

export default AuthorsFiltersDto;
