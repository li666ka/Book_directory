import * as path from 'path';
import * as fs from 'fs';
//
// const fileOldPath: string = path.join('testDir');
// const fileNewPath: string = path.join('uploads', 'testDir');
// console.log(fileOldPath);
// console.log(fileNewPath);
// fs.renameSync(fileOldPath, fileNewPath);

fs.rmSync(path.join('uploads', 'testDir'), {
	recursive: true,
	force: true,
});
