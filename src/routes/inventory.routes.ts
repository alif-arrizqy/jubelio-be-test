import { ServerRoute } from "@hapi/hapi";
import InventoryController from "../controllers/inventory.controller";

const inventoryRoutes: ServerRoute[] = [
    {
        method: "POST",
        path: "/api/inventory/stock-adjustment",
        handler: InventoryController.createStockAdjustment,
        options: {
            auth: {
                strategy: "jwt",
                scope: ["admin"],
            },
        },
    },
    {
        method: "GET",
        path: "/api/inventory/transactions",
        handler: InventoryController.getInventoryTransactions,
        options: {
            auth: {
                strategy: "jwt",
                scope: ["admin", "manager"],
            },
        },
    },
    {
        method: "GET",
        path: "/api/inventory/total-stock",
        handler: InventoryController.getTotalStockAllLocations,
        options: {
            auth: {
                strategy: "jwt",
                scope: ["admin", "manager"],
            },
        },
    },
    {
        method: "GET",
        path: "/api/inventory/total-stock/products/{productId}",
        handler: InventoryController.getTotalStockByProductId,
        options: {
            auth: {
                strategy: "jwt",
                scope: ["admin", "manager"],
            },
        }
    },
    {
        method: "GET",
        path: "/api/inventory/total-stock/locations/{locationId}",
        handler: InventoryController.getTotalStockByLocationId,
        options: {
            auth: {
                strategy: "jwt",
                scope: ["admin", "manager"],
            },
        }
    }
];

export default inventoryRoutes;
