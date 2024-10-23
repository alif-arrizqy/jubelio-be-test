import { ServerRoute, Request, ResponseToolkit } from "@hapi/hapi";
import pool from "./database";
import * as responseHelper from "../helpers/response.helper"

// Health Check route
const healthCheckRoute: ServerRoute = {
    method: "GET",
    path: "/health",
    handler: (request, h) => {
        // return h.response({ status: "ok" }).code(200);
        return h.response(responseHelper.successMessage("Health Check OK", 200)).code(200);
    },
};

// Readiness Check route
const readinessCheckRoute: ServerRoute = {
    method: "GET",
    path: "/readiness",
    handler: async (request: Request, h: ResponseToolkit) => {
        try {
            // Check the database connection
            await pool.query("SELECT 1");
            return h.response(responseHelper.successMessage("Readiness Check OK", 200)).code(200);
        } catch (error) {
            console.error("Readiness check failed:", error);
            return h.response(responseHelper.errorMessage("Readiness Check Failed", `${error}`, 503)).code(503);
        }
    },
};

export { healthCheckRoute, readinessCheckRoute };
