import pool from "../utils/database";
import logger from "../utils/logger";

class RoleService {
    static async createRole(name: string) {
        const client = await pool.connect();
        try {
            const result = await client.query(
                "INSERT INTO roles (name) VALUES ($1) RETURNING *",
                [name]
            );
            return result.rows[0];
        } catch (err) {
            logger.error(`Create role service failed: ${err}`);
            throw err;
        } finally {
            client.release();
        }
    }

    static async getRoles() {
        const client = await pool.connect();
        try {
            const result = await client.query("SELECT * FROM roles");
            if (result === null) {
                return null;
            }
            return result.rows;
        } catch (err) {
            logger.error(`Get roles service failed: ${err}`);
            return null
        } finally {
            client.release();
        }
    }

    static async getRoleById(id: string) {
        const client = await pool.connect();
        try {
            const result = await client.query(
                "SELECT * FROM roles WHERE id = $1",
                [id]
            );
            return result.rows[0];
        } catch (err) {
            logger.error(`Get role by ID service failed: ${err}`);
            throw err;
        } finally {
            client.release();
        }
    }

    static async updateRole(id: number, role: any) {
        const client = await pool.connect();
        try {
            const isExist = await client.query("SELECT * FROM roles WHERE id = $1", [id]);
            if (isExist.rows.length === 0) {
                logger.error("Role not found");
                return "Role not found";
            }

            const result = await client.query(
                "UPDATE roles SET name = $1 WHERE id = $2 RETURNING *",
                [role.name, id]
            );
            return result.rows[0];
        } catch (err) {
            logger.error(`Update role service failed: ${err}`);
            throw err;
        } finally {
            client.release();
        }
    }

    static async deleteRole(id: number) {
        const client = await pool.connect();
        try {
            const isExist = await client.query("SELECT * FROM roles WHERE id = $1", [id]);
            if (isExist.rows.length === 0) {
                logger.error("Role not found");
                return "Role not found";
            }
            
            const result = await client.query(
                "DELETE FROM roles WHERE id = $1 RETURNING *",
                [id]
            );
            return result.rows[0];
        } catch (err) {
            logger.error(`Delete role service failed: ${err}`);
            throw err;
        } finally {
            client.release();
        }
    }
}

export default RoleService;
