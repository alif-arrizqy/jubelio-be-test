import { Request, ResponseToolkit } from "@hapi/hapi";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "./logger";
dotenv.config();

const validateToken = async (decoded: any, request: Request, h: ResponseToolkit) => {
    try {
        // Check if the token is expired
        if (decoded.decoded.payload.exp <= Math.floor(Date.now() / 1000)) {
            return { isValid: false };
        }

        // Check role in JWT Token
        const userRole = decoded.decoded.payload.scope;
        
        if (userRole == "admin") {
            logger.info(`Token valid as ${userRole}`)
            return { isValid: true };
        } else if (userRole == "manager") {
            logger.info(`Token valid as ${userRole}`)
            return { isValid: true };
        } else if (userRole == "staff") {
            logger.info(`Token valid as ${userRole}`)
            return { isValid: true };
        } else {
            return { isValid: false };
        }
    } catch (err) {
        logger.error(`Validate token failed: ${err}`);
        return { isValid: false };
    }
};

const generateToken = (user: any) => {
    const payload = {
        id: user.id,
        username: user.username,
        role: user.role,
        scope: [user.role],
    };
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });
};

export { validateToken, generateToken };
