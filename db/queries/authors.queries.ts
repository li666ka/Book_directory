const AuthorsQueries = {
	GetAll: `
        SELECT *
        FROM authors
	`,
	Get: `
        SELECT *
        FROM authors
        WHERE id = ?
	`,
	Create: `
        INSERT INTO authors (full_name, born_at, died_at, info, image_file, created_at)
        VALUES (?, ?, ?, ?, ?, NOW())
	`,
	Update: `
		UPDATE authors
        SET full_name = ?, born_at = ?, died_at = ?, info = ?, image_file = ?
        WHERE id = ?
	`,
	Delete: `
        DELETE
        FROM authors
        WHERE id = ?
	`,
};

export default AuthorsQueries;
