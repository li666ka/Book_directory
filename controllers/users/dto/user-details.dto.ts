import { UserDto } from './user.dto';
import { BooklistItemDto } from '../../booklist/dto/booklist-item.dto';

export interface UserDetailsDto extends UserDto {
	booklist: Omit<BooklistItemDto, 'user'>[];
}
