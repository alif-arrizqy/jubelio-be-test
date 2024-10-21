import Hapi from "@hapi/hapi";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import healthCheckRoute from "./utils/healthcheck";
import logger from "./utils/logger";

dotenv.config(); // Load environment variables

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT ?? 3000,
        host: "localhost",
    });

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
                return h.response({ error: "Not Found" }).code(404);
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
