import { ServerRoute } from "@hapi/hapi";
import ProductController from "../controllers/product.controller";
import { auditTrail } from "../middlewares/audit";

const productRoutes: ServerRoute[] = [
    {
        method: "POST",
        path: "/api/products",
        handler: ProductController.createProduct,
        options: {
            auth: {
                strategy: "jwt",
                scope: ["admin", "staff"],
            },
            ext: {
                onPostHandler: { method: auditTrail },
            },
        },
    },
    {
        method: "GET",
        path: "/api/products",
        handler: ProductController.getProducts,
        options: {
            auth: {
                strategy: "jwt",
                scope: ["admin", "manager"],
            },
            ext: {
                onPostHandler: { method: auditTrail },
            },
        },
    },
    {
        method: "GET",
        path: "/api/products/{id}",
        handler: ProductController.getProductById,
        options: {
            auth: {
                strategy: "jwt",
                scope: ["admin", "manager"],
            },
            ext: {
                onPostHandler: { method: auditTrail },
            },
        },
    },
    {
        method: "PUT",
        path: "/api/products/{id}",
        handler: ProductController.updateProduct,
        options: {
            auth: {
                strategy: "jwt",
                scope: ["admin", "staff"],
            },
            ext: {
                onPostHandler: { method: auditTrail },
            },
        },
    },
    {
        method: "DELETE",
        path: "/api/products/{id}",
        handler: ProductController.deleteProduct,
        options: {
            auth: {
                strategy: "jwt",
                scope: ["admin", "staff"],
            },
            ext: {
                onPostHandler: { method: auditTrail },
            },
        },
    },
];

export default productRoutes;
