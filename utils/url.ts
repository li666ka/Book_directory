import { CONTENT_ROOT } from '../configs/db.config';
import { UrlData } from '../interfaces/url-data';

async function createAuthorInfoUrlData(name: string): Promise<UrlData> {
	const nameUnderscored: string = name.replaceAll(' ', '_');
	const dirName: string = `/${nameUnderscored}`;
	const fileName: string = `${nameUnderscored}.txt`;
	const url: string = `${dirName}/${fileName}`;

	return {
		dirName: dirName,
		fileName: fileName,
		url: url,
	};
}

export async function createBookPath(
	authorFullName: string,
	title: string
): Promise<string> {
	let a = authorFullName.replaceAll(' ', '_');
	let t = title.replaceAll(' ', '_');
	return `./${CONTENT_ROOT}/${a}/${t}`;
}

export default {
	createBookPath,
};
