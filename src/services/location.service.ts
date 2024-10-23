import pool from "../utils/database";
import logger from "../utils/logger";

class LocationService {
    static async createLocation(name: string, address: string, capacity: number) {
        const client = await pool.connect();
        try {
            const result = await client.query(
                "INSERT INTO locations (name, address, capacity) VALUES ($1, $2, $3) RETURNING *",
                [name, address, capacity]
            );
            return result.rows[0];
        } catch (err) {
            logger.error(`Create location service failed: ${err}`);
            throw err;
        } finally {
            client.release();
        }
    }

    static async updateLocation(id: number, location: any) {
        const client = await pool.connect();
        try {
            const isExist = await client.query("SELECT * FROM locations WHERE id = $1", [id]);
            if (isExist.rows.length === 0) {
                logger.error("Location not found");
                return "Location not found";
            }

            const result = await client.query(
                "UPDATE locations SET name = $1, address = $2, capacity = $3 WHERE id = $4 RETURNING *",
                [location.name, location.address, location.capacity, id]
            );
            return result.rows[0];
        } catch (err) {
            logger.error(`Update location service failed: ${err}`);
            throw err;
        } finally {
            client.release();
        }
    }

    static async deleteLocation(id: number) {
        const client = await pool.connect();
        try {
            const isExist = await client.query("SELECT * FROM locations WHERE id = $1", [id]);
            if (isExist.rows.length === 0) {
                logger.error("Location not found");
                return "Location not found";
            }

            const result = await client.query(
                "DELETE FROM locations WHERE id = $1 RETURNING *",
                [id]
            );
            return result.rows[0];
        } catch (err) {
            logger.error(`Delete location service failed: ${err}`);
            throw err;
        } finally {
            client.release();
        }
    }
}

export default LocationService;
