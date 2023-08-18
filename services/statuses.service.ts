import { StatusDto } from '../controllers/statuses/dto/status.dto';
import { Status, StatusRepository } from '../models/status.model';
import StatusDataValidator from '../validators/data/status.data.validator';
import { CreateStatusDto } from '../controllers/statuses/dto/create-status.dto';
import { UpdateStatusDto } from '../controllers/statuses/dto/update-status.dto';

class StatusesService {
	public static async find(): Promise<StatusDto[]> {
		const statuses: Status[] = await StatusRepository.getAll();

		const statusesDto: StatusDto[] = [];
		for (const status of statuses) {
			const statusDto = this.parseToDto(status);
			statusesDto.push(statusDto);
		}

		return statusesDto;
	}

	public static async findOne(id: number): Promise<StatusDto> {
		const status = await StatusDataValidator.validateGetting(id);
		return this.parseToDto(status);
	}

	public static async create(createStatusDto: CreateStatusDto): Promise<StatusDto> {
		await StatusDataValidator.validateCreating(createStatusDto);
		const { name } = createStatusDto;
		const { insertId } = await StatusRepository.create(name);
		const newStatus = await StatusRepository.get(insertId);
		return this.parseToDto(newStatus);
	}

	public static async update(id: number, updateStatusDto: UpdateStatusDto) {
		await StatusDataValidator.validateUpdating(id, updateStatusDto);
		const { name } = updateStatusDto;
		await StatusRepository.update(name, id);
	}

	public static async delete(id: number) {
		await StatusDataValidator.validateGetting(id);
		await StatusRepository.delete(id);
	}

	public static parseToDto(status: Status): StatusDto {
		return { id: status.id, name: status.name };
	}
}

export default StatusesService;
