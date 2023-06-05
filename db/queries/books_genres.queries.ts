const BooksGenresQueries = {
	GetAllByBookId: `
        SELECT *
        FROM books_genres
        WHERE book_id = ?`,
	Create: `
        INSERT INTO books_genres (book_id, genre_id)
        VALUES (?, ?)`,
	DeleteAllByBookId: `
        DELETE
        FROM books_genres
        WHERE book_id = ?`,
};

export default BooksGenresQueries;
