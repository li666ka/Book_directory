import { StatusesRequest } from '../../types/request.types';
import { Request, Response } from 'express';
import { AppError, HttpCode } from '../../exceptions/app_error';
import { isCreateStatusDto, isUpdateStatusDto } from '../../guards/statuses_dto.guards';

class StatusesRequestValidator {
	public static validate(req: StatusesRequest) {
		switch (req) {
			case 'statuses-create':
				return this.validateCreate;
			case 'statuses-update':
				return this.validateUpdate;
			default:
				return (req: Request, res: Response, next: any) => {
					next();
				};
		}
	}

	private static validateCreate(req: Request, res: Response, next: any) {
		const { body } = req;
		if (!isCreateStatusDto(body))
			throw new AppError(HttpCode.BAD_REQUEST, 'Incorrect CreateStatusDto');
		next();
	}

	private static validateUpdate(req: Request, res: Response, next: any) {
		const { body } = req;
		if (!isUpdateStatusDto(body))
			throw new AppError(HttpCode.BAD_REQUEST, 'Incorrect UpdateStatusDto');
		next();
	}
}

export default StatusesRequestValidator;
