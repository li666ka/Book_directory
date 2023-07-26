import { ParsedQs } from 'qs';

interface GenreFiltersDto extends ParsedQs {
	searchName?: string;
}

export default GenreFiltersDto;
