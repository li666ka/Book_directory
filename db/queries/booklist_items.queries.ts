const BooklistItemsQueries = {
	GetAll: `
        SELECT *
        FROM booklist_items
	`,
	Get: `
        SELECT *
        FROM booklist_items
        WHERE user_id = ? AND book_id = ?
	`,
	Create: `
        INSERT INTO booklist_items (user_id, book_id, status_id)
        VALUES (?, ?, ?)
	`,
	Update: `
        UPDATE booklist_items
        SET status_id = ?
        WHERE user_id = ? AND book_id = ?
	`,
	Delete: `
        DELETE
        FROM booklist_items
        WHERE user_id = ? AND book_id = ?
	`,
};

export default BooklistItemsQueries;
