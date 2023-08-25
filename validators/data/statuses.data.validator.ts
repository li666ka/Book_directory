import { Status, StatusRepository } from '../../models/status.model';
import { AppError, HttpCode } from '../../exceptions/app-error';
import { CreateStatusDto } from '../../controllers/statuses/dto/create-status.dto';
import { UpdateStatusDto } from '../../controllers/statuses/dto/update-status.dto';
import StatusesService from '../../services/statuses.service';

class StatusesDataValidator {
	public static validateGetting(id: number): Status {
		const status: Status | undefined = StatusesService.getById(id);
		if (!status) {
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Status with id ${id} does not exist`
			);
		}
		return status;
	}

	public static validateCreating(createStatusDto: CreateStatusDto) {
		const { name } = createStatusDto;
		const statusSameName: Status | undefined = StatusesService.getByName(name);

		if (statusSameName) {
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Status with name ${name} already exists`
			);
		}
	}

	public static validateUpdating(id: number, updateStatusDto: UpdateStatusDto) {
		const status: Status | undefined = StatusesService.getById(id);
		if (!status)
			new AppError(HttpCode.BAD_REQUEST, `Status with id ${id} does not exist`);

		const { name } = updateStatusDto;
		const statusSameName: Status | undefined = StatusesService.getByName(name);
		if (statusSameName)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Status with name ${name} already exists`
			);
	}
}

export default StatusesDataValidator;
