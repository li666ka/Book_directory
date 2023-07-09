// import { Request, Response } from 'express';
// import { BookGenre, BookGenreRepository } from '../models/book_genre.model';
// import { Genre, GenreRepository } from '../models/genre.model';
//
// class BooksGenresController {
// 	public static async list(
// 		req: Request<{ bookId: number }>,
// 		res: Response<Genre[]>
// 	): Promise<void> {
// 		const { bookId } = req.params;
// 		const bookGenres: BookGenre[] = await BookGenreRepository.getByBookId(bookId);
// 		const genres: Genre[] = [];
//
// 		for (let i = 0; i < bookGenres.length; ++i) {
// 			const genre: Genre = await GenreRepository.getById(bookGenres[i].genre_id);
// 			genres.push(genre);
// 		}
//
// 		res.json(genres);
// 	}
// }
//
// export default BooksGenresController;
