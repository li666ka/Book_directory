const BooksReviewsQueries = {
	GetByBookId: `
        SELECT *
        FROM books_reviews
        WHERE book_id = ?
	`,
	GetByBookIdAndUserId: `
        SELECT *
        FROM books_reviews
        WHERE book_id = ?
          AND user_id = ?`,
	Create: `
        INSERT INTO books_reviews (user_id, book_id, score, comment, created_at)
        VALUES (?, ?, ?, ?, NOW())`,
	UpdateScore: `
        UPDATE books_reviews
        SET score = ?
        WHERE user_id = ?
          AND book_id = ?`,
	UpdateComment: `
        UPDATE books_reviews
        SET comment = ?
        WHERE user_id = ?
          AND book_id = ?`,
	Delete: `
        DELETE
        FROM books_reviews
        WHERE user_id = ?
          AND book_id = ?`,
};

export default BooksReviewsQueries;
