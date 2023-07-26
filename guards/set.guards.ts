import { isInteger } from './primitive_types.guards';

export function isSetNumber(input: any): input is Set<number> {
	return (
		Array.isArray(input) &&
		input.every(isInteger) &&
		input.every(
			(element1) => input.filter((element2) => element2 === element1).length === 1
		)
	);
}
