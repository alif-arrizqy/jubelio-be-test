import pool from "../utils/database";
import logger from "../utils/logger";

class ProductService {
    static async createProduct(name: string, price: number) {
        const client = await pool.connect();
        try {
            const result = await client.query(
                "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
                [name, price]
            );
            return result.rows[0];
        } catch (err) {
            logger.error(`Create product service failed: ${err}`);
            throw err;
        } finally {
            client.release();
        }
    }

    static async getProducts() {
        const client = await pool.connect();
        try {
            const result = await client.query("SELECT * FROM products");
            return result.rows;
        } catch (err) {
            logger.error(`Get products service failed: ${err}`);
            throw err;
        } finally {
            client.release();
        }
    }

    static async getProductById(id: string) {
        const client = await pool.connect();
        try {
            const result = await client.query(
                "SELECT * FROM products WHERE id = $1",
                [id]
            );
            // Filter the result
            const resultFiltered = result.rows.map((product) => {
                return {
                    name: product.name,
                    price: product.price,
                };
            });
            return resultFiltered[0];
        } catch (err) {
            logger.error(`Get product by ID service failed: ${err}`);
            throw err;
        } finally {
            client.release();
        }
    }

    static async updateProduct(id: number, product: any) {
        const client = await pool.connect();
        try {
            const isExist = await client.query("SELECT * FROM products WHERE id = $1", [id]);
            if (isExist.rows.length === 0) {
                logger.error("Product not found");
                return "Product not found";
            }

            const result = await client.query(
                "UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *",
                [product.name, product.price, id]
            );
            return result.rows[0];
        } catch (err) {
            logger.error(`Update product service failed: ${err}`);
            throw err;
        } finally {
            client.release();
        }
    }

    static async deleteProduct(id: number) {
        const client = await pool.connect();
        try {
            const isExist = await client.query("SELECT * FROM products WHERE id = $1", [id]);
            if (isExist.rows.length === 0) {
                logger.error("Product not found");
                return "Product not found";
            }
            
            const result = await client.query(
                "DELETE FROM products WHERE id = $1 RETURNING *",
                [id]
            );
            return result.rowCount !== null && result.rowCount > 0;
        } catch (err) {
            logger.error(`Delete product service failed: ${err}`);
            throw err;
        } finally {
            client.release();
        }
    }
}

export default ProductService;
