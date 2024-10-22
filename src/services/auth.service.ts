import pool from "../utils/database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import logger from "../utils/logger";
import { generateToken } from "../utils/auth";

dotenv.config();

class AuthService {
    static async register(username: string, password: string, name: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const client = await pool.connect();
        try {
            const result = await client.query(
                "INSERT INTO users (username, password, name) VALUES ($1, $2, $3) RETURNING *",
                [username, hashedPassword, name]
            );
            logger.error(result.rows[0]);
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
            if (user && (await bcrypt.compare(password, user.password))) {
                const token = generateToken(user);
                return { token };
            } else {
                throw new Error("Invalid credentials");
            }
        } finally {
            client.release();
        }
    }
}

export default AuthService;
