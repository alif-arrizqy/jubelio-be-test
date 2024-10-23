import { Request, ResponseToolkit } from "@hapi/hapi";
import AuthService from "../services/auth.service";
import logger from "../utils/logger";
import * as responseHelper from "../helpers/response.helper";
import { userValidation, loginValidation, UserData, LoginData } from "../helpers/validation.helper";

class AuthController {
    static async register(request: Request, h: ResponseToolkit) {
        try {
            const isValid = userValidation(request.payload as UserData)
            if (isValid) {
                return h.response(responseHelper.errorMessage("Bad Request", isValid, 400)).code(400);
            }
            const { username, password, name, role } = request.payload as any;
            const result = await AuthService.register(username, password, name, role);         
            if (result === "Role not found") {
                return h.response(responseHelper.errorMessage("Bad Request", "Role not found", 400)).code(400);
            }
            return h.response(responseHelper.successData("Successfully to registeruser", 201)).code(201);
        } catch (error) {
            logger.error(`${error}`)
            return h.response(responseHelper.errorMessage("Internal Server Error", `${error}`, 500)).code(500);
        }
    }

    static async login(request: Request, h: ResponseToolkit) {
        try {
            const isValid = loginValidation(request.payload as LoginData)
            if (isValid) {
                return h.response(responseHelper.errorMessage("Bad Request", isValid, 400)).code(400);
            }
            const { username, password } = request.payload as any;
            const result = await AuthService.login(username, password);
            if (result) {
                return h.response(responseHelper.successData(result, 200)).code(200);
            } else {
                return h.response(responseHelper.errorMessage("Bad Request", "Invalid credentials", 400)).code(400);
            }
        } catch (error) {
            logger.error(`${error}`)
            return h.response(responseHelper.errorMessage("Internal Server Error", `${error}`, 500)).code(500);
        }
    }
}

export default AuthController;
