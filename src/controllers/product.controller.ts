import { Request, ResponseToolkit } from "@hapi/hapi";
import ProductService from "../services/product.service";
import logger from "../utils/logger";
import * as responseHelper from "../helpers/response.helper";
import { productValidation, ProductData } from "../helpers/validation.helper";

class ProductController {
    static async createProduct(request: Request, h: ResponseToolkit) {
        try {
            const isValid = productValidation(request.payload as ProductData);
            if (isValid) {
                logger.error(`Create product failed: ${isValid}`);
                return h.response(responseHelper.errorMessage("Bad Request", isValid, 400)).code(400);
            }
            const { name, price } = request.payload as any;
            const product = await ProductService.createProduct(name, price);
            if (product) {
                return h.response(responseHelper.successMessage("Successfully to insert new product", 201)).code(201);
            } else {
                return h.response(responseHelper.errorMessage("Bad Request", "Failed to insert new product", 400)).code(400);
            }
        } catch (err) {
            logger.error(`Create product failed: ${err}`);
            return h.response(responseHelper.errorMessage("Internal Server Error", `${err}`, 500)).code(500);
        }
    }

    static async getProducts(request: Request, h: ResponseToolkit) {
        try {
            const products = await ProductService.getProducts();
            if (products.length === 0) {
                return h.response(responseHelper.errorMessage("Not Found", "No products found", 404)).code(404);
            }
            return h.response(responseHelper.successData(products, 200)).code(200);
        } catch (err) {
            logger.error(`Get products failed: ${err}`);
            return h.response(responseHelper.errorMessage("Internal Server Error", `${err}`, 500)).code(500);
        }
    }

    static async getProductById(request: Request, h: ResponseToolkit) {
        try {
            const product = await ProductService.getProductById(request.params.id);
            if (product) {
                return h.response(responseHelper.successData(product, 200)).code(200);
            } else {
                return h.response(responseHelper.errorMessage("Not Found", "Product not found", 404)).code(404);
            }
        } catch (err) {
            logger.error(`Get product by ID failed: ${err}`);
            return h.response(responseHelper.errorMessage("Internal Server Error", `${err}`, 500)).code(500);
        }
    }

    static async updateProduct(request: Request, h: ResponseToolkit) {
        try {
            const isValid = productValidation(request.payload as ProductData);
            if (isValid) {
                logger.error(`Update product failed: ${isValid}`);
                return h.response(responseHelper.errorMessage("Bad Request", isValid, 400)).code(400);
            }
            const product = await ProductService.updateProduct(request.params.id, request.payload);
            if (product) {
                return h.response(responseHelper.successMessage("Successfully to update product", 200)).code(200);
            } else {
                return h.response(responseHelper.errorMessage("Not Found", "Product not found", 404)).code(404);
            }
        } catch (err) {
            logger.error(`Update product failed: ${err}`);
            return h.response(responseHelper.errorMessage("Internal Server Error", `${err}`, 500)).code
        }
    }

    static async deleteProduct(request: Request, h: ResponseToolkit) {
        try {
            const isDeleted = await ProductService.deleteProduct(request.params.id);
            if (isDeleted) {
                return h.response(responseHelper.successMessage("Successfully to delete product", 200)).code(200);
            } else {
                return h.response(responseHelper.errorMessage("Not Found", "Product not found", 404)).code(404);
            }
        } catch (err) {
            logger.error(`Delete product failed: ${err}`);
            return h.response(responseHelper.errorMessage("Internal Server Error", `${err}`, 500)).code(500);
        }
    }
}

export default ProductController;
