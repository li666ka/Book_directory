const RolesQueries = {
	GetAll: `
        SELECT *
        FROM roles`,
	GetById: `
        SELECT *
        FROM roles
        WHERE id = ?`,
};

export default RolesQueries;
