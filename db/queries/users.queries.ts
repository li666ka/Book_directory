const UsersQueries = {
	GetAll: `
        SELECT *
        FROM users`,
	GetById: `
        SELECT *
        FROM users
        WHERE id = ?`,
	GetByUsername: `
        SELECT *
        FROM users
        WHERE username = ?`,
	Create: `
        INSERT INTO users (role_id, username, password, created_at)
        VALUES (?, ?, ?, NOW())`,
};

export default UsersQueries;
