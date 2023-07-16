const BooksQueries = {
	GetAll: `
        SELECT *
        FROM books
	`,
	Get: `
        SELECT *
        FROM books
        WHERE id = ?
	`,
	Create: `
        INSERT INTO books (author_id, title, description, image_file, book_file, created_at)
        VALUES (?, ?, ?, ?, ?, NOW())
	`,
	Update: `
        UPDATE books
        SET author_id = ?, title = ?, description = ?, image_file = ?, book_file = ?
        WHERE id = ?
	`,
	Delete: `
        DELETE
        FROM books
        WHERE id = ?
	`,
};

export default BooksQueries;
