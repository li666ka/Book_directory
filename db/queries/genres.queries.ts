const GenresQueries = {
	GetAll: `
        SELECT *
        FROM genres`,

	GetById: `
        SELECT *
        FROM genres
        WHERE id = ?
	`,
};

export default GenresQueries;
