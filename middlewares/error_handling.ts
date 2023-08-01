import { Request, Response } from 'express';
import { AppError, HttpCode } from '../exceptions/app_error';

export function handleError(error: Error, req: Request, res: Response, next: any) {
	const { message } = error;
	if (error instanceof AppError) {
		const { httpCode } = error;
		res.status(httpCode).json({ message });
	} else {
		res.sendStatus(HttpCode.NOT_FOUND);
	}
	console.error(message);
}
