import { Request, ResponseToolkit } from "@hapi/hapi";
import AuthService from "../services/auth.service";

class AuthController {
  static async register(request: Request, h: ResponseToolkit) {
    const { username, password, name } = request.payload as any;
    const result = await AuthService.register(username, password, name);
    return h.response(result).code(201);
  }

  static async login(request: Request, h: ResponseToolkit) {
    const { username, password } = request.payload as any;
    const result = await AuthService.login(username, password);
    return h.response(result).code(200);
  }
}

export default AuthController;
