import pool from "../utils/database";
import logger from "../utils/logger";

class InventoryService {
    static async createStockAdjustment(
        productId: string,
        locationId: string,
        stock: number,
        operation: string,
        notes: string
    ) {
        const client = await pool.connect();
        try {
            // Get current total stock
            const currentStockResult = await client.query(
                "SELECT total_stock FROM inventory WHERE product_id = $1 AND location_id = $2",
                [productId, locationId]
            );
            const currentTotalStock =
                currentStockResult.rows[0]?.total_stock || 0;
            logger.info(`Current total stock: ${currentTotalStock}`);

            // Get capacity of warehouse
            const capacityResult = await client.query(
                "SELECT capacity FROM locations WHERE id = $1",
                [locationId]
            );
            const capacityWarehouse = capacityResult.rows[0]?.capacity;
            if (capacityWarehouse === undefined) {
                logger.error("Warehouse not found");
                throw new Error("Warehouse not found");
            }
            logger.info(`Capacity of warehouse: ${capacityWarehouse}`);

            // Calculate new stock based on operation
            let newStock;
            if (operation === "IN") {
                newStock = currentTotalStock + stock;
                if (newStock > capacityWarehouse) {
                    logger.error("Stock cannot be more than warehouse capacity");
                    throw new Error("Stock cannot be more than warehouse capacity");
                }
            } else if (operation === "OUT") {
                newStock = currentTotalStock - stock;
                if (newStock < 0) {
                    logger.error("Stock cannot be negative");
                    throw new Error("Stock cannot be negative");
                }
            } else {
                logger.error("Invalid operation");
                throw new Error("Invalid operation");
            }

            // Insert the transaction to inventory_transactions
            await client.query(
                "INSERT INTO inventory_transactions (product_id, location_id, stock, notes) VALUES ($1, $2, $3, $4)",
                [productId, locationId, stock, notes]
            );

            // Update or insert total stock in the inventory
            const inventoryResult = await client.query(
                `INSERT INTO inventory (product_id, location_id, total_stock)
                    VALUES ($1, $2, $3)
                    ON CONFLICT (product_id, location_id)
                    DO UPDATE SET total_stock = EXCLUDED.total_stock
                 RETURNING *`,
                [productId, locationId, newStock]
            );

            return inventoryResult.rows[0];
        } catch (err) {
            logger.error(`Create stock adjustment service failed: ${err}`);
            throw err;
        } finally {
            client.release();
        }
    }

    static async getInventoryTransactions() {
        const client = await pool.connect();
        try {
            // inner join table inventory_transactions and products and locations
            const result = await client.query(`
                SELECT inventory_transactions.id, products.name as product_name, locations.name as location_name, inventory_transactions.stock, inventory_transactions.notes
                FROM inventory_transactions
                INNER JOIN products ON inventory_transactions.product_id = products.id
                INNER JOIN locations ON inventory_transactions.location_id = locations.id
                `);
            return result.rows;
        } catch (err) {
            logger.error(`Get inventory transactions service failed: ${err}`);
            throw err;
        } finally {
            client.release();
        }
    }

    static async getTotalStockAllLocations() {
        const client = await pool.connect();
        try {
            // inner join table inventory and products and locations
            const result = await client.query(`
                SELECT products.name as product_name, locations.name as location_name, inventory.total_stock
                FROM inventory
                INNER JOIN products ON inventory.product_id = products.id
                INNER JOIN locations ON inventory.location_id = locations.id
                `);
            return result.rows;
        } catch (err) {
            logger.error(`Get total stock all locations service failed: ${err}`);
            throw err;
        } finally {
            client.release();
        }
    }

    static async getTotalStockByProductId(productId: string) {
        const client = await pool.connect();
        try {
            // inner join table inventory and products and locations
            const result = await client.query(`
                SELECT products.name as product_name, locations.name as location_name, inventory.total_stock
                FROM inventory
                INNER JOIN products ON inventory.product_id = products.id
                INNER JOIN locations ON inventory.location_id = locations.id
                WHERE products.id = $1
                `, [productId]);
            return result.rows;
        } catch (err) {
            logger.error(`Get stock by product ID service failed: ${err}`);
            throw err;
        } finally {
            client.release();
        }
    }

    static async getTotalStockByLocationID(locationId: string) {
        const client = await pool.connect();
        try {
            // inner join table inventory, products and locations
            const result = await client.query(`
                SELECT products.name as product_name, locations.name as location_name, inventory.total_stock
                FROM inventory
                INNER JOIN products ON inventory.product_id = products.id
                INNER JOIN locations ON inventory.location_id = locations.id
                WHERE locations.id = $1
                `, [locationId]);
            return result.rows;
        } catch (err) {
            logger.error(`Get stock by location ID service failed: ${err}`)
            throw err;
        } finally {
            client.release();
        }
    }
}

export default InventoryService;
