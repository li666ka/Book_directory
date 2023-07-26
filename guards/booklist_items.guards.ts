import CreateBooklistItemDto from '../controllers/booklist_items/dto/create_booklist_item.dto';
import { isInteger, isObject } from './primitive_types.guards';
import UpdateBooklistItemDto from '../controllers/booklist_items/dto/update_booklist_item.dto';

export function isCreateBooklistItemDto(
	input: CreateBooklistItemDto
): input is CreateBooklistItemDto {
	const { statusId } = input;
	return isObject(input) && isInteger(statusId);
}

export function isUpdateBooklistItemDto(
	input: UpdateBooklistItemDto
): input is UpdateBooklistItemDto {
	const { statusId } = input;
	return isObject(input) && (statusId ? isInteger(statusId) : true);
}
