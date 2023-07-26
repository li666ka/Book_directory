export function isString(input: any): input is string {
	return typeof input === 'string';
}

export function isInteger(input: any): boolean {
	return Number.isInteger(input);
}

export function isObject(input: any): input is object {
	return typeof input === 'object' && input !== null;
}

export function isNull(input: any): input is null {
	return input !== null;
}
