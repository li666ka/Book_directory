import { Request, Response } from 'express';
import { Status, StatusRepository } from '../models/status.model';

class StatusesController {
	public static async list(req: Request, res: Response): Promise<void> {
		const statuses: Status[] = await StatusRepository.get();
		res.json(statuses);
	}
}

export default StatusesController;
