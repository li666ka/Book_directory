import 'dotenv/config';
import app from './app';

const port: number = Number(process.env.PORT) || 4000;

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
