import { Request, ResponseToolkit, Lifecycle } from "@hapi/hapi";
import logger from "../utils/logger";
import pool from "../utils/database";

export const auditTrail = async (
    request: Request,
    h: ResponseToolkit
): Promise<Lifecycle.ReturnValue> => {
    const { method, url, payload, auth } = request;
    const user = auth.credentials ? auth.credentials.username : "anonymous";

    // Determine action type based on HTTP method
    let actionType: string;
    switch (method.toUpperCase()) {
        case "POST":
            actionType = "CREATE";
            break;
        case "PUT":
            actionType = "UPDATE";
            break;
        case "DELETE":
            actionType = "DELETE";
            break;
        default:
            actionType = "READ";
            break;
    }

    // Convert payload to JSON string
    const payloadString = JSON.stringify(payload);

    // Log into audit trail table
    try {
        await pool.query(
            'INSERT INTO audit_trail (method, url, payload, "user", action_type) VALUES ($1, $2, $3::jsonb, $4, $5)',
            [method, url, payloadString, user, actionType]
        );
    } catch (error) {
        logger.error(`Failed to log into audit trail: ${error}`);
    }

    return h.continue;
};
