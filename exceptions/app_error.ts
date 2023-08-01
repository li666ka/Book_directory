export enum HttpCode {
	OK = 200,
	CREATED = 201,
	NO_CONTENT = 204,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	INTERNAL_SERVER_ERROR = 500,
}

export class AppError extends Error {
	public readonly httpCode: HttpCode;

	constructor(httpCode: HttpCode, message: string) {
		super(message);
		Object.setPrototypeOf(this, new.target.prototype);
		this.httpCode = httpCode;
		// Error.captureStackTrace(this);
	}
}
