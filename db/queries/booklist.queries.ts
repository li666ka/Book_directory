const BooklistQueries = {
	GetAll: `
        SELECT *
        FROM booklist
	`,
	Get: `
        SELECT *
        FROM booklist
        WHERE user_id = ? AND book_id = ?
	`,
	Create: `
        INSERT INTO booklist (user_id, book_id, status_id)
        VALUES (?, ?, ?)
	`,
	Update: `
        UPDATE booklist
        SET status_id = ?
        WHERE user_id = ? AND book_id = ?
	`,
	Delete: `
        DELETE
        FROM booklist
        WHERE user_id = ? AND book_id = ?
	`,
};

export default BooklistQueries;
