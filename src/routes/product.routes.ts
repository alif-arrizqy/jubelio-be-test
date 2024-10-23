import { ServerRoute } from "@hapi/hapi";
import ProductController from "../controllers/product.controller";

const productRoutes: ServerRoute[] = [
    {
        method: "POST",
        path: "/api/products",
        handler: ProductController.createProduct,
        options: {
            auth: {
                strategy: "jwt",
                scope: ["admin", "staff"],
            }
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
            }
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
            }
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
            }
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
            }
        },
    },
];

export default productRoutes;
