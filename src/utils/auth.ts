import { Request, ResponseToolkit } from "@hapi/hapi";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "./logger";

dotenv.config();

const VALID_ROLES = new Set(['admin', 'manager', 'staff']);
const TOKEN_EXPIRED_MESSAGE = 'Token expired';
const INVALID_ROLE_MESSAGE = 'Invalid role';

interface DecodedToken {
    decoded: {
        payload: {
            exp: number;
            scope: string;
        };
    };
}

const validateToken = async (decoded: DecodedToken, request: Request, h: ResponseToolkit) => {
    try {
        const { exp, scope } = decoded.decoded.payload;

        // Check if the token is expired
        if (exp <= Math.floor(Date.now() / 1000)) {
            logger.error(TOKEN_EXPIRED_MESSAGE);
            return { isValid: false };
        }

        // Check role in JWT Token
        if (VALID_ROLES.has(scope[0])) {
            return { isValid: true };
        } else {
            logger.error(`${INVALID_ROLE_MESSAGE}: ${scope}`);
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
