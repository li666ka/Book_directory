import { Request, Response } from 'express';
import { BookReview, BookReviewRepository } from '../models/review.model';
import { JWT_SECRET, JWTPayload } from '../utils/jwt';
import jwt from 'jsonwebtoken';
import { Role, RoleRepository } from '../models/role.model';
import { User, UserRepository } from '../models/user.model';

class BooksReviewsController {
	public static async list(
		req: Request<{ bookId: number }>,
		res: Response<BookReview[]>
	): Promise<void> {
		const { bookId } = req.params;

		const reviews: BookReview[] = await BookReviewRepository.getByBookId(bookId);

		res.json(reviews);
	}

	public static async get(
		req: Request<{ bookId: number; userId: number }>,
		res: Response<BookReview | undefined>
	): Promise<void> {
		const { bookId, userId } = req.params;

		const review: BookReview = await BookReviewRepository.getByBookIdAndUserId(
			bookId,
			userId
		);

		res.json(review);
	}

	public static async create(
		req: Request<
			{ bookId: number; userId: number },
			{ score: number; comment?: string; token: string }
		>,
		res: Response
	): Promise<void> {
		const { bookId, userId } = req.params;
		const { score, comment, token } = req.body;

		const decoded: JWTPayload = jwt.verify(token, JWT_SECRET) as JWTPayload;

		const role: Role | undefined = await RoleRepository.getById(decoded.role_id);
		const user: User | undefined = await UserRepository.getById(decoded.user_id);

		let isPermitted: boolean = false;

		if (role)
			if (role.name === 'user' && user.id === decoded.user_id) isPermitted = true;

		if (isPermitted) {
			await BookReviewRepository.create(userId, bookId, score, comment);

			const newReview: BookReview = await BookReviewRepository.getByBookIdAndUserId(
				bookId,
				userId
			);

			res.json(newReview);
		} else {
			res.sendStatus(400);
		}
	}

	public static async update(
		req: Request<
			{ bookId: number; userId: number },
			{ score?: number; comment?: string; token: string }
		>,
		res: Response
	): Promise<void> {
		console.log(req.body);
		const { bookId, userId } = req.params;
		const { score, comment, token } = req.body;

		const decoded: JWTPayload = jwt.verify(token, JWT_SECRET) as JWTPayload;

		const role: Role | undefined = await RoleRepository.getById(decoded.role_id);
		const user: User | undefined = await UserRepository.getById(decoded.user_id);

		let isPermitted: boolean = false;

		if (role)
			if (role.name === 'user' && user.id === decoded.user_id) isPermitted = true;

		if (isPermitted) {
			if (score) {
				await BookReviewRepository.updateScore(userId, bookId, score);
			}

			if (comment) {
				await BookReviewRepository.updateComment(userId, bookId, comment);
			}

			const updatedReview: BookReview =
				await BookReviewRepository.getByBookIdAndUserId(bookId, userId);
			res.json(updatedReview);
		} else {
			res.sendStatus(400);
		}
	}

	public static async delete(
		req: Request<{ bookId: number; userId: number }, { token: string }>,
		res: Response
	): Promise<void> {
		console.log(req.params);
		const { bookId, userId } = req.params;
		const { token } = req.body;

		const decoded: JWTPayload = jwt.verify(token, JWT_SECRET) as JWTPayload;

		const role: Role | undefined = await RoleRepository.getById(decoded.role_id);
		const user: User | undefined = await UserRepository.getById(decoded.user_id);

		let isPermitted: boolean = false;

		if (role)
			if (role.name === 'user' && user.id === decoded.user_id) isPermitted = true;

		if (isPermitted) {
			await BookReviewRepository.delete(userId, bookId);
			res.sendStatus(200);
		} else {
			res.sendStatus(400);
		}
	}
}

export default BooksReviewsController;
