import pool from "../utils/database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import logger from "../utils/logger";
import { generateToken } from "../utils/auth";

dotenv.config();

class AuthService {
    static async register(username: string, password: string, name: string, role: number) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const client = await pool.connect();
        try {

            // Validate the role of the user
            const checkRole = await client.query(
                "SELECT * FROM roles WHERE id = $1",
                [role]
            );
            if (checkRole.rows.length === 0) {
                logger.error("Role not found");
                return "Role not found";
            }

            const result = await client.query(
                "INSERT INTO users (username, password, name, role) VALUES ($1, $2, $3, $4) RETURNING *",
                [username, hashedPassword, name, role]
            );
            return result.rows[0];
        } finally {
            client.release();
        }
    }

    static async login(username: string, password: string) {
        const client = await pool.connect();
        try {
            const result = await client.query(
                "SELECT * FROM users WHERE username = $1",
                [username]
            );
            const user = result.rows[0];
            // find role of the user
            const role = await client.query(
                "SELECT * FROM roles WHERE id = $1",
                [user.role]
            );
            user.role = role.rows[0].name;
            if (user && (await bcrypt.compare(password, user.password))) {
                const token = generateToken(user);                
                return { token };
            } else {
                logger.error("Invalid credentials");
                return null;
            }
        } catch (err) {
            logger.error(`Login failed: ${err}`);
        } finally {
            client.release();
        }
    }
}

export default AuthService;
