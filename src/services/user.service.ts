import pool from "../utils/database";
import logger from "../utils/logger";

class UserService {
    static async getUsers() {
        const client = await pool.connect();
        try {
            // inner join table users and roles
            const result = await client.query(`
                SELECT users.id, users.username, users.name, roles.name as role_name
                FROM users 
                INNER JOIN roles ON users.role = roles.id
                `)
            return result.rows;
        } catch (err) {
            logger.error(`Get users service failed: ${err}`);
            throw err;
        } finally {
            client.release();
        }
    }

    static async getUserById(id: string) {
        const client = await pool.connect();
        try {
            // inner join table users and roles find by id users
            const result = await client.query(`
                SELECT users.id, users.username, users.name, roles.name as role_name
                FROM users 
                INNER JOIN roles ON users.role = roles.id
                WHERE users.id = $1
                `, [id]);
            return result.rows;
        } catch (err) {
            logger.error(`Get user by ID service failed: ${err}`);
            throw err;
        } finally {
            client.release();
        }
    }
}

export default UserService;
