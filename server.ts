import 'dotenv/config';
import app from './app';
import { storeData } from './utils/db.util';

const port: number = Number(process.env.PORT) || 4000;

storeData().then(() => {
	app.listen(port, () => {
		console.log(`Server is listening on port ${port}`);
	});
});
