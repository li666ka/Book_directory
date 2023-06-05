import { RowDataPacket } from 'mysql2';
import RolesQueries from '../db/queries/roles.queries';
import DB_CONNECTION from '../utils/db.connector';

export interface Role extends RowDataPacket {
	id: number;
	name: string;
}

export class RoleRepository {
	public static async get(): Promise<Role[] | never> {
		const query: string = RolesQueries.GetAll;
		const [rows] = await DB_CONNECTION.promise().query<Role[]>(query);
		return rows;
	}

	public static async getById(id: number): Promise<Role | undefined | never> {
		const query: string = RolesQueries.GetById;
		const values: any[] = [id];
		const [rows] = await DB_CONNECTION.promise().query<Role[]>(query, values);
		return rows[0];
	}
}

export default Role;
