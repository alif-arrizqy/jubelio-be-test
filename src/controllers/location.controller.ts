import { Request, ResponseToolkit } from "@hapi/hapi";
import LocationService from "../services/location.service";
import logger from "../utils/logger";
import * as responseHelper from "../helpers/response.helper";
import { locationValidation, LocationData } from "../helpers/validation.helper";

class LocationController {
    static async createLocation(request: Request, h: ResponseToolkit) {
        try {
            const isValid = locationValidation(request.payload as LocationData);
            if (isValid) {
                logger.error(`Create location failed: ${isValid}`);
                return h.response(responseHelper.errorMessage("Bad Request", isValid, 400)).code(400);
            }
            const { name, address, capacity } = request.payload as any;
            const location = await LocationService.createLocation(name, address, capacity);
            if (location) {
                return h.response(responseHelper.successMessage("Successfully to insert new location", 201)).code(201);
            } else {
                return h.response(responseHelper.errorMessage("Bad Request", "Failed to insert new location", 400)).code(400);
            }
        } catch (err) {
            logger.error(`Create location failed: ${err}`);
            return h.response(responseHelper.errorMessage("Internal Server Error", `${err}`, 500)).code(500);
        }
    }

    static async updateLocation(request: Request, h: ResponseToolkit) {
        try {
            const isValid = locationValidation(request.payload as LocationData);
            if (isValid) {
                logger.error(`Update location failed: ${isValid}`);
                return h.response(responseHelper.errorMessage("Bad Request", isValid, 400)).code(400);
            }
            const { name, address, capacity } = request.payload as any;
            const location = await LocationService.updateLocation(request.params.id, { name, address, capacity });
            if (location === "Location not found") {
                return h.response(responseHelper.errorMessage("Bad Request", location, 400)).code(400);
            }
            return h.response(responseHelper.successMessage("Successfully to update location", 200)).code(200);
        } catch (err) {
            logger.error(`Update location failed: ${err}`);
            return h.response(responseHelper.errorMessage("Internal Server Error", `${err}`, 500)).code(500);
        }
    }

    static async deleteLocation(request: Request, h: ResponseToolkit) {
        try {
            const isDeleted = await LocationService.deleteLocation(request.params.id);
            if (isDeleted === "Location not found") {
                return h.response(responseHelper.errorMessage("Bad Request", isDeleted, 400)).code(400);
            }
            return h.response(responseHelper.successMessage("Successfully to delete location", 200)).code(200);
        } catch (err) {
            logger.error(`Delete location failed: ${err}`);
            return h.response(responseHelper.errorMessage("Internal Server Error", `${err}`, 500)).code(500);
        }
    }
}

export default LocationController;
