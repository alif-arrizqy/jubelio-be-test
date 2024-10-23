import { ServerRoute } from "@hapi/hapi";
import ProductController from "../controllers/product.controller";

const productRoutes: ServerRoute[] = [
    {
        method: "POST",
        path: "/api/products",
        handler: ProductController.createProduct,
        options: {
            auth: "jwt",
        },
    },
    {
        method: "GET",
        path: "/api/products",
        handler: ProductController.getProducts,
        options: {
            auth: "jwt",
        },
    },
    {
        method: "GET",
        path: "/api/products/{id}",
        handler: ProductController.getProductById,
        options: {
            auth: "jwt",
        },
    },
    {
        method: "PUT",
        path: "/api/products/{id}",
        handler: ProductController.updateProduct,
        options: {
            auth: "jwt",
        },
    },
    {
        method: "DELETE",
        path: "/api/products/{id}",
        handler: ProductController.deleteProduct,
        options: {
            auth: "jwt",
        },
    },
];

export default productRoutes;
