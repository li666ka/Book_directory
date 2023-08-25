import fs from 'fs';

export async function deleteFile(path: string) {
	return new Promise<void>((resolve, reject) => {
		fs.rm(path, (err) => {
			if (err) reject(err);
			resolve();
		});
	});
}
