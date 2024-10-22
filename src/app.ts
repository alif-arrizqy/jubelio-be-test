import Hapi from "@hapi/hapi";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import healthCheckRoute from "./utils/healthcheck";
import logger from "./utils/logger";
import { validateToken } from "./utils/auth";
import HapiJwt from "@hapi/jwt";

dotenv.config(); // Load environment variables

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT ?? 3000,
        host: "localhost",
    });

    // Register the JWT plugin
    await server.register(HapiJwt);

    // Define the JWT authentication strategy
    server.auth.strategy("jwt", "jwt", {
        keys: process.env.JWT_SECRET!,
        validate: validateToken,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: 14400, // 4 hours
            timeSkewSec: 15,
        },
    });

    // Set the default authentication strategy
    server.auth.default("jwt");

    const routes = [
        ...authRoutes,
        healthCheckRoute,
        {
            method: "GET",
            path: "/",
            handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
                return { message: "Welcome to API Jubelio BE Test!" };
            },
        },
        // Default route for handling undefined routes
        {
            method: "*",
            path: "/{any*}",
            handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
                return h.response({ error: "Endpoint Not Found" }).code(404);
            },
        },
    ];

    server.route(routes);

    await server.start();
    logger.info(`Server running on ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
    logger.error(err);
    process.exit(1);
});

init();
