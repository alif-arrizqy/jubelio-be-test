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

    static async getUserByUsername(request: Request, h: ResponseToolkit) {
        try {
            const user = await UserService.getUserByUsername(request.params.username);
            if (user) {
                return h.response(responseHelper.successData(user, 200)).code(200);
            } else {
                return h.response(responseHelper.errorMessage("Not Found", "User not found", 404)).code(404);
            }
        } catch (err) {
            logger.error(`Get user by username failed: ${err}`);
            return h.response(responseHelper.errorMessage("Internal Server Error", `${err}`, 500)).code(500);
        }
    }

    static async updateUser(request: Request, h: ResponseToolkit) {
        try {
            const isValid = await UserService.updateUser(request.params.id, request.payload);
            if (isValid === "Role not found" || isValid === "User not found") {
                return h.response(responseHelper.errorMessage("Bad Request", isValid, 400)).code(400);
            }
            return h.response(responseHelper.successMessage("User updated successfully", 200)).code(200);
        } catch (err) {
            logger.error(`Update user failed: ${err}`);
            return h.response(responseHelper.errorMessage("Internal Server Error", `${err}`, 500)).code(500);
        }
    }

    static async deleteUser(request: Request, h: ResponseToolkit) {
        try {
            const isDeleted = await UserService.deleteUser(request.params.id);
            if (isDeleted === "User not found") {
                return h.response(responseHelper.errorMessage("Not Found", "User not found", 404)).code(404);
            } else {
                return h.response(responseHelper.successMessage("Successfully to delete user", 200)).code(200);
            }
        } catch (err) {
            logger.error(`Delete user failed: ${err}`);
            return h.response(responseHelper.errorMessage("Internal Server Error", `${err}`, 500)).code(500);
        }
    }
}

export default UserController;
