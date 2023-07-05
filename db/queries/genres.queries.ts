const GenresQueries = {
	GetAll: `
        SELECT *
        FROM genres`,
	Get: `
        SELECT *
        FROM genres
        WHERE id = ?`,
	Create: `
		INSERT INTO genres (name)
		VALUES (?)`,
	Update: `
		UPDATE genres
		SET name = ?
		WHERE id = ?`,
	Delete: `
		DELETE
        FROM genres
        WHERE id = ?`
};

export default GenresQueries;
