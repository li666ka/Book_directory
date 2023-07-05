const UsersBooksQueries = {
	GetAll: `
        SELECT *
        FROM users_books
	`,
	Get: `
        SELECT *
        FROM users_books
        WHERE user_id = ? AND book_id = ?
	`,
	Create: `
        INSERT INTO users_books (user_id, book_id, status_id)
        VALUES (?, ?, ?)
	`,
	Update: `
        UPDATE users_books
        SET status_id = ?
        WHERE user_id = ? AND book_id = ?
	`,
	Delete: `
        DELETE
        FROM users_books
        WHERE user_id = ? AND book_id = ?
	`,
};

export default UsersBooksQueries;
