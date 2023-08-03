import { Request, Response } from 'express';
import { StatusDto } from './dto/status.dto';
import { CreateStatusDto } from './dto/create_status.dto';
import StatusesService from '../../services/statuses.service';
import { parseToInt } from '../../utils/parsing.util';
import { UpdateStatusDto } from './dto/update_status.dto';
import { HttpCode } from '../../exceptions/app_error';

class StatusesController {
	public static async getAll(req: Request, res: Response<StatusDto[]>) {
		const statuses = await StatusesService.find();
		res.json(statuses);
	}

	public static async get(req: Request<{ id: string }>, res: Response<StatusDto>) {
		const { id } = req.params;
		const parsedId = parseToInt(id);
		const status = await StatusesService.findOne(parsedId);
		res.json(status);
	}

	public static async create(
		req: Request<never, never, CreateStatusDto>,
		res: Response<StatusDto>
	) {
		const { body } = req;
		const newStatus = await StatusesService.create(body);
		res.json(newStatus);
	}

	public static async update(
		req: Request<{ id: string }, never, UpdateStatusDto>,
		res: Response
	) {
		const { id } = req.params;
		const parsedId = parseToInt(id);
		const { body } = req;
		await StatusesService.update(parsedId, body);
		res.sendStatus(HttpCode.OK);
	}

	public static async delete(req: Request<{ id: string }>, res: Response) {
		const { id } = req.params;
		const parsedId = parseToInt(id);
		await StatusesService.delete(parsedId);
		res.sendStatus(HttpCode.OK);
	}
}

export default StatusesController;
