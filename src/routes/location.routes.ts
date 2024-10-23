import { ServerRoute } from "@hapi/hapi";
import LocationController from "../controllers/location.controller";
import { auditTrail } from "../middlewares/audit";

const locationRoutes: ServerRoute[] = [
    {
        method: "POST",
        path: "/api/locations",
        handler: LocationController.createLocation,
        options: {
            auth: {
                strategy: "jwt",
                scope: ["admin", "staff"],
            },
            ext: {
                onPostHandler: { method: auditTrail },
            },
        },
    },
    {
        method: "PUT",
        path: "/api/locations/{id}",
        handler: LocationController.updateLocation,
        options: {
            auth: {
                strategy: "jwt",
                scope: ["admin", "staff"],
            },
            ext: {
                onPostHandler: { method: auditTrail },
            },
        },
    },
    {
        method: "DELETE",
        path: "/api/locations/{id}",
        handler: LocationController.deleteLocation,
        options: {
            auth: {
                strategy: "jwt",
                scope: ["admin", "staff"],
            },
            ext: {
                onPostHandler: { method: auditTrail },
            },
        },
    },
];

export default locationRoutes;
