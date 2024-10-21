import Hapi from "@hapi/hapi";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import healthCheckRoute from "./utils/healthcheck";
import logger from "./utils/logger";
import pool from "./utils/database";

dotenv.config();

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT ?? 3000,
        host: "localhost",
    });

    server.route([...authRoutes, healthCheckRoute]);

    await server.start();
    logger.info(`Server running on ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
    logger.error(err);
    process.exit(1);
});

init();
