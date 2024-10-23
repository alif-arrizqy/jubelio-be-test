import { ServerRoute } from "@hapi/hapi";
import UserController from "../controllers/user.controller";

const userRoutes: ServerRoute[] = [
    {
        method: "GET",
        path: "/api/users",
        handler: UserController.getUsers,
        options: {
            auth: {
                strategy: "jwt",
                scope: ["admin"],
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
                scope: ["admin"],
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
                scope: ["admin"],
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
        },
    },
    {
        method: "DELETE",
        path: "/api/users/{id}",
        handler: UserController.deleteUser,
        options: {
            auth: {
                strategy: "jwt",
                scope: ["admin"],
            },
        },
    },
];

export default userRoutes;
