import { ServerRoute } from "@hapi/hapi";
import AuthController from "../controllers/auth.controller";

const authRoutes: ServerRoute[] = [
  {
    method: "POST",
    path: "/api/auth/register",
    handler: AuthController.register,
  },
  {
    method: "POST",
    path: "/api/auth/login",
    handler: AuthController.login,
  },
];

export default authRoutes;
