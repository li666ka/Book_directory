const StatusesQueries = {
	GetAll: `
        SELECT *
        FROM statuses
	`,
	Get: `
        SELECT *
        FROM statuses
        WHERE id = ?
	`,
	Create: `
		INSERT INTO statuses (name)
		VALUES (?)
	`,
	Update: `
        UPDATE statuses 
        SET name = ?
        WHERE id = ?
	`,
	Delete: `
        DELETE
        FROM statuses
        WHERE id = ?
	`
};

export default StatusesQueries;
