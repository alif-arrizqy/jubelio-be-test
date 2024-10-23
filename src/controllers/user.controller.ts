import { Request, ResponseToolkit } from "@hapi/hapi";
import UserService from "../services/user.service";
import logger from "../utils/logger";
import * as responseHelper from "../helpers/response.helper";

class UserController {
    static async getUsers(request: Request, h: ResponseToolkit) {
        try {
            const users = await UserService.getUsers();
            if (users.length === 0) {
                return h.response(responseHelper.errorMessage("Not Found", "Users not found", 404)).code(404);
            }
            return h.response(responseHelper.successData(users, 200)).code(200);
        } catch (err) {
            logger.error(`Get users failed: ${err}`);
            return h.response(responseHelper.errorMessage("Internal Server Error", `${err}`, 500)).code(500);
        }
    }

    static async getUserById(request: Request, h: ResponseToolkit) {
        try {
            const user = await UserService.getUserById(request.params.id);
            if (user) {
                return h.response(responseHelper.successData(user, 200)).code(200);
            } else {
                return h.response(responseHelper.errorMessage("Not Found", "User not found", 404)).code(404);
            }
        } catch (err) {
            logger.error(`Get user by ID failed: ${err}`);
            return h.response(responseHelper.errorMessage("Internal Server Error", `${err}`, 500)).code(500);
        }
    }
}

export default UserController;
