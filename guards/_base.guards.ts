export function isString(input: any): input is string {
	return typeof input === 'string' && input !== '';
}

export function isInteger(input: any): boolean {
	return Number.isInteger(input);
}

export function isObject(input: any): input is object {
	return typeof input === 'object';
}

export function isNull(input: any): input is null {
	return input !== null;
}

export function isIntSet(input: any): input is Set<number> {
	return isSet(input) && Array.from(input).every(isInteger);
}

export function isStringArray(input: any): input is Array<string> {
	return Array.from(input).every(isString);
}

export function isSet(input: any): input is Set<any> {
	return (
		Array.isArray(input) &&
		input.every(
			(element1) => input.filter((element2) => element2 === element1).length === 1
		)
	);
}
