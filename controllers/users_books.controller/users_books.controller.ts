// import { Request, Response } from 'express';
// import jwt from 'jsonwebtoken';
// import { Book, BookRepository } from '../models/book.model';
// import { UserBook, UserBookRepository } from '../models/user_book.model';
// import Status, { StatusRepository } from '../models/status.model';
// import { JWT_SECRET, JWTPayload } from '../services/jwt';
// import { Role, RoleRepository } from '../models/role.model';
// import User, { UserRepository } from '../models/user.model';
//
// class UsersBooksController {
// 	public static async list(
// 		req: Request<{ userId: number }>,
// 		res: Response<Book[]>
// 	): Promise<void> {
// 		const { userId } = req.params;
//
// 		const userBooks: UserBook[] = await UserBookRepository.getByUserId(userId);
// 		const books: Book[] = [];
// 		for (let i = 0; i < userBooks.length; i++) {
// 			const book: Book = await BookRepository.getById(userBooks[i].book_id);
// 			books.push(book);
// 		}
// 		res.json(books);
// 	}
//
// 	public static async get(
// 		req: Request<{ userId: number; bookId: number }>,
// 		res: Response<Book | undefined>
// 	): Promise<void> {
// 		const { userId, bookId } = req.params;
//
// 		const userBook: UserBook = await UserBookRepository.getByUserIdAndByBookId(
// 			userId,
// 			bookId
// 		);
//
// 		if (userBook) {
// 			const book: Book = await BookRepository.getById(userBook.book_id);
//
// 			res.json(book);
// 		} else {
// 			res.json(undefined);
// 		}
// 	}
//
// 	public static async create(
// 		req: Request<
// 			{ userId: number; bookId: number },
// 			{ status_id: number; token: string }
// 		>,
// 		res: Response
// 	): Promise<void> {
// 		const { userId, bookId } = req.params;
// 		const { status_id, token } = req.body;
//
// 		const decoded: JWTPayload = jwt.verify(token, JWT_SECRET) as JWTPayload;
//
// 		const role: Role | undefined = await RoleRepository.getById(decoded.role_id);
// 		const user: User | undefined = await UserRepository.getById(decoded.user_id);
//
// 		let isPermitted: boolean = false;
//
// 		if (role)
// 			if (role.name === 'user' && user.id === decoded.user_id) isPermitted = true;
//
// 		if (isPermitted) {
// 			await UserBookRepository.create(userId, bookId, status_id);
// 			res.sendStatus(200);
// 		} else {
// 			res.sendStatus(400);
// 		}
// 	}
//
// 	public static async update(
// 		req: Request<
// 			{ userId: number; bookId: number },
// 			{ statusId: number; token: string }
// 		>,
// 		res: Response
// 	): Promise<void> {
// 		const { userId, bookId } = req.params;
// 		const { statusId, token } = req.body;
//
// 		const decoded: JWTPayload = jwt.verify(token, JWT_SECRET) as JWTPayload;
//
// 		const role: Role | undefined = await RoleRepository.getById(decoded.role_id);
// 		const user: User | undefined = await UserRepository.getById(decoded.user_id);
//
// 		let isPermitted: boolean = false;
//
// 		if (role)
// 			if (role.name === 'user' && user.id === decoded.user_id) isPermitted = true;
//
// 		if (isPermitted) {
// 			await UserBookRepository.updateStatus(statusId, userId, bookId);
//
// 			res.sendStatus(200);
// 		} else {
// 			res.sendStatus(400);
// 		}
// 	}
//
// 	public static async delete(
// 		req: Request<{ userId: number; bookId: number }, { token: string }>,
// 		res: Response
// 	): Promise<void> {
// 		const { userId, bookId } = req.params;
// 		const { token } = req.body;
//
// 		const decoded: JWTPayload = jwt.verify(token, JWT_SECRET) as JWTPayload;
//
// 		const role: Role | undefined = await RoleRepository.getById(decoded.role_id);
// 		const user: User | undefined = await UserRepository.getById(decoded.user_id);
//
// 		let isPermitted: boolean = false;
//
// 		if (role)
// 			if (role.name === 'user' && user.id === decoded.user_id) isPermitted = true;
//
// 		if (isPermitted) {
// 			await UserBookRepository.delete(userId, bookId);
// 			res.sendStatus(200);
// 		} else {
// 			res.sendStatus(400);
// 		}
// 	}
//
// 	public static async status(
// 		req: Request<{ userId: number; bookId: number }>,
// 		res: Response<Status>
// 	): Promise<void> {
// 		const { userId, bookId } = req.params;
//
// 		const statusId: number = (
// 			await UserBookRepository.getByUserIdAndByBookId(userId, bookId)
// 		).status_id;
//
// 		const status: Status = await StatusRepository.getById(statusId);
//
// 		res.json(status);
// 	}
// }
//
// export default UsersBooksController;
