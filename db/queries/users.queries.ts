const UsersQueries = {
	GetAll: `
        SELECT *
        FROM users
	`,
	Get: ` 
        SELECT *
        FROM users
        WHERE id = ?`,
	Create: `
        INSERT INTO users (role_id, username, password, created_at)
        VALUES (?, ?, ?, NOW())`,
	Update: `
		UPDATE users
		SET role_id = ?, username = ?, password = ?
		WHERE id = ?
	`,
	Delete: `
        DELETE
        FROM users
        WHERE id = ?
	`
};

export default UsersQueries;
