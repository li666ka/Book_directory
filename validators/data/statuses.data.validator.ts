import { Status, StatusRepository } from '../../models/status.model';
import { AppError, HttpCode } from '../../exceptions/app-error';
import { CreateStatusDto } from '../../controllers/statuses/dto/create-status.dto';
import { UpdateStatusDto } from '../../controllers/statuses/dto/update-status.dto';

class StatusesDataValidator {
	public static async validateGetting(id: number): Promise<Status> {
		const status: Status | undefined = await StatusRepository.get(id);
		if (!status)
			new AppError(HttpCode.BAD_REQUEST, `Status with id ${id} does not exist`);
		return status;
	}

	public static async validateCreating(createStatusDto: CreateStatusDto) {
		const { name } = createStatusDto;
		const statusSameName: Status | undefined = (await StatusRepository.getAll()).find(
			(status) => status.name === name
		);

		if (statusSameName)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Status with name ${name} already exists`
			);
	}

	public static async validateUpdating(id: number, updateStatusDto: UpdateStatusDto) {
		const status: Status | undefined = await StatusRepository.get(id);
		if (!status)
			new AppError(HttpCode.BAD_REQUEST, `Status with id ${id} does not exist`);

		const { name } = updateStatusDto;
		const statusSameName: Status | undefined = (await StatusRepository.getAll()).find(
			(status) => status.name === name
		);
		if (statusSameName)
			throw new AppError(
				HttpCode.BAD_REQUEST,
				`Status with name ${name} already exists`
			);
	}
}

export default StatusesDataValidator;
