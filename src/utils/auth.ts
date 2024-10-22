import { Request, ResponseToolkit } from "@hapi/hapi";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const validateToken = async (decoded: any, request: Request, h: ResponseToolkit) => {
    // Implement your token validation logic here
    return { isValid: true };
};

const generateToken = (user: any) => {
    return jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
    );
};

export { validateToken, generateToken };
