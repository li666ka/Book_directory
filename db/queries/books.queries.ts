const BooksQueries = {
	GetAll: `
        SELECT *
        FROM books`,
	GetById: `
        SELECT *
        FROM books
        WHERE id = ?`,
	GetAllByAuthorId: `
        SELECT *
        FROM books
        WHERE author_id = ?`,
	GetByTitleAndAuthorId: `
        SELECT *
        FROM books
        WHERE title = ?
          AND author_id = ?`,
	Create: `
        INSERT INTO books (author_id, title, img_url, description, url, created_at)
        VALUES (?, ?, ?, ?, ?, NOW())`,
	UpdateTitle: `
        UPDATE books
        SET title = ?
        WHERE id = ?`,
	UpdateAuthorId: `
        UPDATE books
        SET author_id = ?
        WHERE id = ?`,
	UpdateImgUrl: `
        UPDATE books
        SET img_url = ?
        WHERE id = ?`,
	UpdateUrl: `
        UPDATE books
        SET url = ?
        WHERE id = ?`,
	UpdateDescription: `
        UPDATE books
        SET description = ?
        WHERE id = ?`,
	Delete: `
        DELETE
        FROM books
        WHERE id = ?
	`,
};

export default BooksQueries;
