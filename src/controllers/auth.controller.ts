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
                return h.response(responseHelper.errorMessage(400, isValid)).code(400);
            }
            const { username, password, name } = request.payload as any;
            const result = await AuthService.register(username, password, name);
            if (result) {
                return h.response(responseHelper.successMessage(201, "Successfully to register user")).code(201);
            } else {
                return h.response(responseHelper.errorMessage(400, "Failed to register user")).code(400);
            }            
        } catch (error) {
            logger.error(`${error}`)
            return h.response(responseHelper.errorMessage(400, `${error}`)).code(400);
        }
    }

    static async login(request: Request, h: ResponseToolkit) {
        try {
            const isValid = loginValidation(request.payload)
            if (isValid) {
                return h.response(responseHelper.errorMessage(400, isValid)).code(400);
            }
            const { username, password } = request.payload as any;
            const result = await AuthService.login(username, password);
            if (result) {
                return h.response(responseHelper.successData(200, result)).code(200);
            } else {
                return h.response(responseHelper.errorMessage(400, "Invalid credentials")).code(400);
            }
        } catch (error) {
            logger.error(`${error}`)
            return h.response(responseHelper.errorMessage(400, `${error}`)).code(400);
        }
    }
}

export default AuthController;
