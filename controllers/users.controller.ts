import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWTPayload, JWT_SECRET } from '../utils/jwt';
import UserDTO from './dto/user.dto';
import { User, UserRepository } from '../models/user.model';
import { Book, BookRepository } from '../models/book.model';
import { UserBook, UserBookRepository } from '../models/user_book.model';

class UsersController {
	public static async list(req: Request, res: Response<UserDTO[]>): Promise<void> {
		const users: User[] = await UserRepository.get();
		const usersDTO: UserDTO[] = [] as UserDTO[];

		for (let i = 0; i < users.length; i++) {
			const userDTO: UserDTO = {
				id: users[i].id,
				role_id: users[i].role_id,
				username: users[i].username,
				created_at: users[i].created_at,
			};

			usersDTO.push(userDTO);
		}
		res.json(usersDTO);
	}

	public static async getUserBooks(
		req: Request<{ id: number }>,
		res: Response<Book[]>
	): Promise<void> {
		const { id } = req.params;
		const booksIds: UserBook[] = await UserBookRepository.getByUserId(id);
		const books: Book[] = [];

		for (let i = 0; i < booksIds.length; ++i) {
			const book: Book = await BookRepository.getById(booksIds[i].book_id);
			books.push(book);
		}

		res.json(books);
	}

	public static async get(req: Request<{ id: number }>, res: Response<UserDTO>) {
		const { id } = req.params;
		const user: User = await UserRepository.getById(id);
		const userDTO: UserDTO = {
			id: user.id,
			role_id: user.role_id,
			username: user.username,
			created_at: user.created_at,
		};

		res.json(userDTO);
	}

	public static async authenticate(
		req: Request<never, never, never, { username: string; password: string }>,
		res: Response<string>
	): Promise<void> {
		console.log(req.body);
		const { username, password } = req.body;
		const user: User = await UserRepository.getByUsername(username);

		const isCorrectPassword: boolean = await bcrypt.compare(password, user.password);
		if (isCorrectPassword) {
			const jwtPayload: JWTPayload = {
				user_id: user.id,
				username: user.username,
				role_id: user.role_id,
			};

			res.json(jwt.sign(jwtPayload, JWT_SECRET));
		} else {
			res.status(400);
		}
	}

	public static async create(
		req: Request<never, never, never, { username: string; password: string }>,
		res: Response<string>
	): Promise<void> {
		console.log(req.body);
		const { username, password } = req.body;

		const hashPassword: string = await bcrypt.hash(password, 10);
		const newUser: User = await UserRepository.create(1, username, hashPassword);

		const jwtPayload: JWTPayload = {
			user_id: newUser.id,
			username: newUser.username,
			role_id: newUser.role_id,
		};

		res.json(jwt.sign(jwtPayload, JWT_SECRET));
	}
}

export default UsersController;
