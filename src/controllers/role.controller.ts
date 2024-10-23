import { Request, ResponseToolkit } from "@hapi/hapi";
import RoleService from "../services/role.service";
import logger from "../utils/logger";
import * as responseHelper from "../helpers/response.helper";
import { roleValidation, RoleData } from "../helpers/validation.helper";

class RoleController {
    static async createRole(request: Request, h: ResponseToolkit) {
        try {
            const isValid = roleValidation(request.payload as RoleData);
            if (isValid) {
                logger.error(`Create role failed: ${isValid}`);
                return h.response(responseHelper.errorMessage("Bad Request", isValid, 400)).code(400);
            }
            const { name } = request.payload as any;
            const role = await RoleService.createRole(name);
            if (role) {
                return h.response(responseHelper.successMessage("Successfully to insert new role", 201)).code(201);
            } else {
                return h.response(responseHelper.errorMessage("Bad Request", "Failed to insert new role", 400)).code(400);
            }
        } catch (err) {
            logger.error(`Create role failed: ${err}`);
            return h.response(responseHelper.errorMessage("Internal Server Error", `${err}`, 500)).code(500);
        }
    }

    static async getRoles(request: Request, h: ResponseToolkit) {
        try {
            const roles = await RoleService.getRoles();
            if (roles?.length === 0) {
                return h.response(responseHelper.errorMessage("Not Found", "No roles found", 404)).code(404);
            }
            return h.response(responseHelper.successData(roles, 200)).code(200);
        } catch (err) {
            logger.error(`Get roles failed: ${err}`);
            return h.response(responseHelper.errorMessage("Internal Server Error", `${err}`, 500)).code(500);
        }
    }

    static async getRoleById(request: Request, h: ResponseToolkit) {
        try {
            const role = await RoleService.getRoleById(request.params.id);
            if (role) {
                return h.response(responseHelper.successData(role, 200)).code(200);
            } else {
                return h.response(responseHelper.errorMessage("Not Found", "Role not found", 404)).code(404);
            }
        } catch (err) {
            logger.error(`Get role by ID failed: ${err}`);
            return h.response(responseHelper.errorMessage("Internal Server Error", `${err}`, 500)).code(500);
        }
    }

    static async updateRole(request: Request, h: ResponseToolkit) {
        try {
            const isValid = roleValidation(request.payload as RoleData);
            if (isValid) {
                logger.error(`Update role failed: ${isValid}`);
                return h.response(responseHelper.errorMessage("Bad Request", isValid, 400)).code(400);
            }
            const role = await RoleService.updateRole(request.params.id, request.payload);
            if (role) {
                return h.response(responseHelper.successData("Successfully to update role", 200)).code(200);
            } else {
                return h.response(responseHelper.errorMessage("Not Found", "Role not found", 400)).code(400);
            }
        } catch (err) {
            logger.error(`Update role failed: ${err}`);
            return h.response(responseHelper.errorMessage("Internal Server Error", `${err}`, 500)).code(500);
        }
    }

    static async deleteRole(request: Request, h: ResponseToolkit) {
        try {
            const isDeleted = await RoleService.deleteRole(request.params.id);
            if (isDeleted) {
                return h.response(responseHelper.successMessage("Successfully to delete role", 200)).code(200);
            } else {
                return h.response(responseHelper.errorMessage("Not Found", "Role not found", 404)).code(404);
            }
        } catch (err) {
            logger.error(`Delete role failed: ${err}`);
            return h.response(responseHelper.errorMessage("Internal Server Error", `${err}`, 500)).code(500);
        }
    }
}

export default RoleController;
