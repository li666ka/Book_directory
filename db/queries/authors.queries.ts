const AuthorsQueries = {
	GetAll: `
        SELECT *
        FROM authors`,
	GetAllByFullName: `
        SELECT *
        FROM authors
        WHERE full_name LIKE ?`,
	GetById: `
        SELECT *
        FROM authors
        WHERE id = ?`,
	GetByFullName: `
        SELECT *
        FROM authors
        WHERE full_name = ?`,
	Create: `
        INSERT INTO authors (full_name, born_at, died_at, img_url, info, created_at)
        VALUES (?, ?, ?, ?, ?, NOW())`,
	Delete: `
        DELETE
        FROM authors
        WHERE id = ?
	`,
};

export default AuthorsQueries;
