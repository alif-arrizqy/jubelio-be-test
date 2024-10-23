import { ServerRoute } from "@hapi/hapi";
import UserController from "../controllers/user.controller";
import { auditTrail } from "../middlewares/audit";

const userRoutes: ServerRoute[] = [
    {
        method: "GET",
        path: "/api/users",
        handler: UserController.getUsers,
        options: {
            auth: {
                strategy: "jwt",
                scope: ["admin", "manager"],
            },
            ext: {
                onPostHandler: { method: auditTrail },
            },
        },
    },
    {
        method: "GET",
        path: "/api/users/{id}",
        handler: UserController.getUserById,
        options: {
            auth: {
                strategy: "jwt",
                scope: ["admin", "manager"],
            },
            ext: {
                onPostHandler: { method: auditTrail },
            },
        },
    },
    {
        method: "GET",
        path: "/api/users/username/{username}",
        handler: UserController.getUserByUsername,
        options: {
            auth: {
                strategy: "jwt",
                scope: ["admin", "manager"],
            },
        },
    },
    {
        method: "PUT",
        path: "/api/users/{id}",
        handler: UserController.updateUser,
        options: {
            auth: {
                strategy: "jwt",
                scope: ["admin", "manager", "staff"],
            },
            ext: {
                onPostHandler: { method: auditTrail },
            },
        },
    },
    {
        method: "DELETE",
        path: "/api/users/{id}",
        handler: UserController.deleteUser,
        options: {
            auth: {
                strategy: "jwt",
                scope: ["admin", "manager"],
            },
            ext: {
                onPostHandler: { method: auditTrail },
            },
        },
    },
];

export default userRoutes;
