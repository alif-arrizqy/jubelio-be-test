import { ServerRoute } from "@hapi/hapi";
import RoleController from "../controllers/role.controller";

const roleRoutes: ServerRoute[] = [
    {
        method: "POST",
        path: "/api/roles",
        handler: RoleController.createRole,
        options: {
            auth: false,
        },
    },
    {
        method: "GET",
        path: "/api/roles",
        handler: RoleController.getRoles,
        options: {
            auth: false,
        },
    },
    {
        method: "GET",
        path: "/api/roles/{id}",
        handler: RoleController.getRoleById,
        options: {
            auth: false,
        },
    },
    {
        method: "PUT",
        path: "/api/roles/{id}",
        handler: RoleController.updateRole,
        options: {
            auth: false,
        },
    },
    {
        method: "DELETE",
        path: "/api/roles/{id}",
        handler: RoleController.deleteRole,
        options: {
            auth: false,
        },
    },
];

export default roleRoutes;
