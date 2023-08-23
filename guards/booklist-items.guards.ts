import { isInteger, isObject } from './_base.guards';
import { CreateBooklistItemDto } from '../controllers/booklist/dto/create-booklist-item.dto';
import { UpdateBooklistItemDto } from '../controllers/booklist/dto/update-booklist-item.dto';

export function isCreateBooklistItemDto(input: any): input is CreateBooklistItemDto {
	return isObject(input) && 'statusId' in input && isInteger(input.statusId);
}

export function isUpdateBooklistItemDto(input: any): input is UpdateBooklistItemDto {
	return isObject(input) && 'statusId' in input && isInteger(input.statusId);
}
