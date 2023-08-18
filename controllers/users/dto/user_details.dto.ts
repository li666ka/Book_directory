import { UserDto } from './user.dto';
import { BooklistItemDto } from '../../booklist-items/dto/booklist-item.dto';

export interface UserDetailsDto extends UserDto {
	booklist: Omit<BooklistItemDto, 'user'>[];
}
