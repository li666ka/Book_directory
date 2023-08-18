const BooksGenresQueries = {
	GetAll: `
        SELECT *
        FROM books_genres
	`,
	Get: `
		SELECT * 
		FROM books_genres 
		WHERE book_id = ? AND genre_id = ?
	`,
	Create: `
        INSERT INTO books_genres (book_id, genre_id)
        VALUES (?, ?)
	`,
	/* No UPDATE query, because these rows can be only deleted */
	Delete: `
        DELETE
        FROM books_genres
        WHERE book_id = ? AND genre_id = ?
	`,
};

export default BooksGenresQueries;
