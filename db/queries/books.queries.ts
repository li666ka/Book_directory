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
        INSERT INTO books (author_id, title, img_url, description, url, created_at)
        VALUES (?, ?, ?, ?, ?, NOW())
	`,
	Update: `
        UPDATE books
        SET author_id = ?, title = ?, img_url = ?, description = ?, url = ?
        WHERE id = ?
	`,
	Delete: `
        DELETE
        FROM books
        WHERE id = ?
	`,
};

export default BooksQueries;
