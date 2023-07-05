const ReviewsQueries = {
	GetAll: `
        SELECT *
        FROM reviews
	`,
	Get: `
        SELECT *
        FROM reviews
        WHERE user_id = ? AND book_id = ?
	`,
	Create: `
        INSERT INTO reviews (user_id, book_id, score, comment, created_at)
        VALUES (?, ?, ?, ?, NOW())
	`,
	Update: `
        UPDATE reviews 
        SET score = ?, comment = ?
        WHERE user_id = ? AND book_id = ?
        `,
	Delete: `
        DELETE
        FROM  reviews
        WHERE user_id = ? AND book_id = ?
	`,
};

export default ReviewsQueries;
