import {Request, ResponseToolkit} from "@hapi/hapi";
import InventoryService from "../services/inventory.service";
import logger from "../utils/logger";
import * as responseHelper from "../helpers/response.helper";
import {inventoryStockAdjustmentValidation, InventoryStockAdjustmentData} from "../helpers/validation.helper";

class InventoryController {
    static async createStockAdjustment(request: Request, h: ResponseToolkit) {
        try {
            const isValid = inventoryStockAdjustmentValidation(request.payload as InventoryStockAdjustmentData);
            if (isValid) {
                logger.error(`Create stock adjustment failed: ${isValid}`);
                return h.response(responseHelper.errorMessage("Bad Request", isValid, 400)).code(400);
            }
            const { productId, locationId, stock, operation, notes } = request.payload as any;
            await InventoryService.createStockAdjustment(productId, locationId, stock, operation, notes);
            return h.response(responseHelper.successMessage("Successfully to create stock adjustment", 201)).code(201);
        } catch (err) {
            logger.error(`Create stock adjustment failed: ${err}`);
            return h.response(responseHelper.errorMessage("Internal Server Error", `${err}`, 500)).code(500);
        }
    }

    static async getInventoryTransactions(request: Request, h: ResponseToolkit) {
        try {
            const inventoryTransactions = await InventoryService.getInventoryTransactions();
            if (inventoryTransactions.length === 0) {
                return h.response(responseHelper.errorMessage("Not Found", "No inventory transactions found", 404)).code(404);
            }
            return h.response(responseHelper.successData(inventoryTransactions, 200)).code(200);
        } catch (err) {
            logger.error(`Get inventory transactions failed: ${err}`);
            return h.response(responseHelper.errorMessage("Internal Server Error", `${err}`, 500)).code(500);
        }
    }

    static async getTotalStockAllLocations(request: Request, h: ResponseToolkit) {
        try {
            const totalStockAllLocations = await InventoryService.getTotalStockAllLocations();
            if (totalStockAllLocations.length === 0) {
                return h.response(responseHelper.errorMessage("Not Found", "No total stock from all locations found", 404)).code(404);
            }
            return h.response(responseHelper.successData(totalStockAllLocations, 200)).code(200);
        } catch (err) {
            logger.error(`Get total stock all locations failed: ${err}`);
            return h.response(responseHelper.errorMessage("Internal Server Error", `${err}`, 500)).code(500);
        }
    }

    static async getTotalStockByProductId(request: Request, h: ResponseToolkit) {
        try {
            const productId = request.params.productId;
            const stockByProductId = await InventoryService.getTotalStockByProductId(productId);
            if (stockByProductId.length === 0) {
                return h.response(responseHelper.errorMessage("Not Found", `No stock found for product ID ${productId}`, 404)).code(404);
            }
            return h.response(responseHelper.successData(stockByProductId, 200)).code(200);
        } catch (err) {
            logger.error(`Get stock by product ID failed: ${err}`);
            return h.response(responseHelper.errorMessage("Internal Server Error", `${err}`, 500)).code(500);
        }
    }

    static async getTotalStockByLocationId(request: Request, h: ResponseToolkit) {
        try {
            const locationId = request.params.locationId;
            const stockByLocationId = await InventoryService.getTotalStockByLocationID(locationId);
            if (stockByLocationId.length === 0) {
                return h.response(responseHelper.errorMessage("Not Found", `No stock found for location ID ${locationId}`, 404)).code(404);
            }
            return h.response(responseHelper.successData(stockByLocationId, 200)).code(200);
        } catch (err) {
            logger.error(`Get stock by location ID failed: ${err}`);
            return h.response(responseHelper.errorMessage("Internal Server Error", `${err}`, 500)).code(500);
        }
    }
}

export default InventoryController;
