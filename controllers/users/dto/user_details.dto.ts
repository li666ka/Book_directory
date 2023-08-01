import { UserDto } from './user.dto';
import { BooklistItemDto } from '../../booklist_items/dto/booklist_item.dto';

export interface UserDetailsDto extends UserDto {
	booklist: Omit<BooklistItemDto, 'user'>[];
}
