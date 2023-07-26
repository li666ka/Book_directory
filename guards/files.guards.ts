import { Readable } from 'stream';
import { isInteger, isObject, isString } from './primitive_types.guards';

export function isFilesObject(
	input: any
): input is { [key: string]: Express.Multer.File[] } {
	return (
		isObject(input) &&
		Object.values(input).every((arr) => Array.isArray(arr) && arr.every(isFile))
	);
}

function isFile(input: any): input is Express.Multer.File {
	const {
		fieldname,
		originalname,
		encoding,
		mimetype,
		size,
		stream,
		destination,
		filename,
		path,
		buffer,
	} = input;
	return (
		isObject(input) &&
		isString(fieldname) &&
		isString(originalname) &&
		isString(encoding) &&
		isString(mimetype) &&
		isInteger(size) &&
		stream instanceof Readable &&
		isString(destination) &&
		isString(filename) &&
		isString(path) &&
		buffer instanceof Buffer
	);
}
