const StatusesQueries = {
	GetAll: `
        SELECT *
        FROM statuses`,
	GetById: `
        SELECT *
        FROM statuses
        WHERE id = ?`,
};

export default StatusesQueries;
