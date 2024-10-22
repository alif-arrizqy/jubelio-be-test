import { ServerRoute } from "@hapi/hapi";
import AuthController from "../controllers/auth.controller";

const authRoutes: ServerRoute[] = [
    {
        method: "POST",
        path: "/api/auth/register",
        handler: AuthController.register,
        options: {
            auth: false,
        },
    },
    {
        method: "POST",
        path: "/api/auth/login",
        handler: AuthController.login,
        options: {
            auth: false,
        },
    },
];

export default authRoutes;
