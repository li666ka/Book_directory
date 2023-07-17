import multer from 'multer';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

export const STATIC_DIR = `uploads`;

const storage = multer.diskStorage({
	destination(
		req: Request,
		file: Express.Multer.File,
		callback: (error: Error | null, filename: string) => void
	) {
		callback(null, STATIC_DIR);
	},
	filename(
		req: Request,
		file: Express.Multer.File,
		callback: (error: Error | null, filename: string) => void
	) {
		callback(null, uuidv4() + path.extname(file.originalname));
	},
});

export const upload = multer({
	storage: storage,
});

// const uploadBookFile = multer({
// 	storage: bookFilesStorage,
// 	// fileFilter(
// 	// 	req: Request,
// 	// 	file: Express.Multer.File,
// 	// 	callback: multer.FileFilterCallback
// 	// ) {
// 	// 	if (file.mimetype === 'application/pdf') {
// 	// 		return callback(null, true);
// 	// 	}
// 	// 	return callback(null, false);
// 	// },
// });
