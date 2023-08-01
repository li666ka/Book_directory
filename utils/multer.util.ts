import multer from 'multer';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

export const STATIC_DIR = `uploads`;

export const BOOK_IMAGE_FIELD = 'book-image';
export const BOOK_FILE_FIELD = 'book-file';
export const AUTHOR_IMAGE_FIELD = 'author-image';

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
