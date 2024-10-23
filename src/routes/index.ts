import { Server } from "@hapi/hapi";
import userRoutes from "./user.routes";
import productRoutes from "./product.routes";
import locationRoutes from "./location.routes";
import inventoryRoutes from "./inventory.routes";";
import { auditTrail } from "../middlewares/audit";

export const registerRoutes = (server: Server) => {
    server.ext("onPostHandler", auditTrail); // Attach audit middleware to all routes

    server.route(userRoutes)
    server.route(productRoutes)
    server.route(locationRoutes)
    server.route(inventoryRoutes)
};
