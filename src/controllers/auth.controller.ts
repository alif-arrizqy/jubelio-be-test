import { Request, ResponseToolkit } from "@hapi/hapi";
import AuthService from "../services/auth.service";
import logger from "../utils/logger";
import * as responseHelper from "../helpers/response.helper";
import { userValidation, loginValidation } from "../helpers/validation.helper";

class AuthController {
    static async register(request: Request, h: ResponseToolkit) {
        try {
            const isValid = userValidation(request.payload);
            if (isValid) {
                return h.response(responseHelper.errorMessage("Bad Request", isValid, 400)).code(400);
            }
            const { username, password, name } = request.payload as any;
            const result = await AuthService.register(username, password, name);
            if (result) {
                return h.response(responseHelper.successMessage("Successfully to register user", 201)).code(201);
            } else {
                return h.response(responseHelper.errorMessage("Bad Request", "Failed to register user", 400)).code(400);
            }            
        } catch (error) {
            logger.error(`${error}`)
            return h.response(responseHelper.errorMessage("Internal Server Error", `${error}`, 500)).code(500);
        }
    }

    static async login(request: Request, h: ResponseToolkit) {
        try {
            const isValid = loginValidation(request.payload)
            if (isValid) {
                return h.response(responseHelper.errorMessage("Bad Request", isValid, 400)).code(400);
            }
            const { username, password } = request.payload as any;
            const result = await AuthService.login(username, password);
            if (result) {
                return h.response(responseHelper.successData(result, 200)).code(200);
            } else {
                return h.response(responseHelper.errorMessage("Bad Request", "Login Failed", 400)).code(400);
            }
        } catch (error) {
            logger.error(`${error}`)
            return h.response(responseHelper.errorMessage("Internal Server Error", `${error}`, 500)).code(500);
        }
    }
}

export default AuthController;
