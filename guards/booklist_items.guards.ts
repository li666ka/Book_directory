import { isInteger, isObject } from './_base.guards';
import { CreateBooklistItemDto } from '../controllers/booklist_items/dto/create_booklist_item.dto';
import { UpdateBooklistItemDto } from '../controllers/booklist_items/dto/update_booklist_item.dto';

export function isCreateBooklistItemDto(input: any): input is CreateBooklistItemDto {
	return isObject(input) && 'statusId' in input && isInteger(input.statusId);
}

export function isUpdateBooklistItemDto(input: any): input is UpdateBooklistItemDto {
	return isObject(input) && 'statusId' in input && isInteger(input.statusId);
}
