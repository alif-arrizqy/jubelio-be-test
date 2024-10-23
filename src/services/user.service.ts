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
            return result.rows[0];
        } catch (err) {
            logger.error(`Get user by ID service failed: ${err}`);
            throw err;
        } finally {
            client.release();
        }
    }

    static async getUserByUsername(username: string) {
        const client = await pool.connect();
        try {
            // inner join table users and roles find by username users
            const result = await client.query(`
                SELECT users.id, users.username, users.name, roles.name as role_name
                FROM users 
                INNER JOIN roles ON users.role = roles.id
                WHERE users.username = $1
                `, [username]);
            return result.rows[0];
        } catch (err) {
            logger.error(`Get user by username service failed: ${err}`);
            throw err;
        } finally {
            client.release();
        }
    }

    static async updateUser(id: number, user: any) {
        const client = await pool.connect();
        try {

            // Validate user is exist
            const isExist = await client.query(`SELECT * FROM users WHERE id = $1`, [id]);
            if (isExist.rows.length === 0) {
                logger.error("User not found");
                return "User not found";
            }

            // Validate the role of user
            const checkRole = await client.query(`SELECT * FROM roles WHERE id = $1`, [user.role]);
            if (checkRole.rows.length === 0) {
                logger.error("Role not found");
                return "Role not found";
            }

            // Update user by id
            const result = await client.query(`
                UPDATE users SET name = $1, role = $2 WHERE id = $3 RETURNING username, name, role
                `, [user.name, user.role, id]);
            return result.rows;
        } catch (err) {
            logger.error(`Update user service failed: ${err}`);
            throw err;
        } finally {
            client.release();
        }
    }

    static async deleteUser(id: number) {
        const client = await pool.connect();
        try {
            const isExist = await client.query(`SELECT * FROM users WHERE id = $1`, [id]);
            if (isExist.rows.length === 0) {
                logger.error("User not found");
                return "User not found";
            }
            
            const result = await client.query(`
                DELETE FROM users WHERE id = $1 RETURNING username, name, role
                `, [id]);
            return result.rows;
        } catch (err) {
            logger.error(`Delete user service failed: ${err}`);
            throw err;
        } finally {
            client.release();
        }
    }
}

export default UserService;
