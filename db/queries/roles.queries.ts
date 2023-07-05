const RolesQueries = {
	GetAll: `
        SELECT *
        FROM roles`,
	Get: `
        SELECT *
        FROM roles
        WHERE id = ?`,
	Create: `
		INSERT INTO roles (name)
		VALUES (?)
	`,
	Update: `
        UPDATE roles 
        SET name = ?
        WHERE id = ?
	`,
	Delete: `
        DELETE
        FROM roles
        WHERE id = ?
	`
};

export default RolesQueries;
