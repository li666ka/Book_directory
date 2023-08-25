import { StatusDto } from '../controllers/statuses/dto/status.dto';
import { Status, StatusRepository } from '../models/status.model';
import StatusesDataValidator from '../validators/data/statuses.data.validator';
import { CreateStatusDto } from '../controllers/statuses/dto/create-status.dto';
import { UpdateStatusDto } from '../controllers/statuses/dto/update-status.dto';

class StatusesService {
	public static find(): StatusDto[] {
		const statuses: Status[] = StatusRepository.cache;

		const statusesDto: StatusDto[] = [];
		for (const status of statuses) {
			const statusDto = this.parseToDto(status);
			statusesDto.push(statusDto);
		}

		return statusesDto;
	}

	public static findOne(id: number): StatusDto {
		const status = StatusesDataValidator.validateGetting(id);
		return this.parseToDto(status);
	}

	public static getById(id: number): Status | undefined {
		return StatusRepository.cache.find((status) => status.id === id);
	}

	public static getByName(name: string): Status | undefined {
		return StatusRepository.cache.find((status) => status.name === name);
	}

	public static async create(createStatusDto: CreateStatusDto): Promise<StatusDto> {
		await StatusesDataValidator.validateCreating(createStatusDto);
		const { name } = createStatusDto;
		const { insertId } = await StatusRepository.create(name);
		const newStatus = await StatusRepository.get(insertId);
		await StatusRepository.store();
		return this.parseToDto(newStatus);
	}

	public static async update(id: number, updateStatusDto: UpdateStatusDto) {
		await StatusesDataValidator.validateUpdating(id, updateStatusDto);
		const { name } = updateStatusDto;
		await StatusRepository.update(name, id);
		await StatusRepository.store();
	}

	public static async delete(id: number) {
		await StatusesDataValidator.validateGetting(id);
		await StatusRepository.delete(id);
		await StatusRepository.store();
	}

	public static parseToDto(status: Status): StatusDto {
		return { id: status.id, name: status.name };
	}
}

export default StatusesService;
