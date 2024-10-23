import { ServerRoute } from "@hapi/hapi";
import LocationController from "../controllers/location.controller";

const locationRoutes: ServerRoute[] = [
    {
        method: "POST",
        path: "/api/locations",
        handler: LocationController.createLocation,
        options: {
            auth: {
                strategy: "jwt",
                scope: ["admin", "staff"],
            }
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
            }
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
            }
        },
    },
];

export default locationRoutes;
