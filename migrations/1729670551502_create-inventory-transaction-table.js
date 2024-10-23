/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable("inventory_transactions", {
        id: { type: "serial", primaryKey: true },
        product_id: {
            type: "integer",
            notNull: true,
            references: "products",
            onDelete: "CASCADE",
        },
        location_id: {
            type: "integer",
            notNull: true,
            references: "locations",
            onDelete: "CASCADE",
        },
        stock: {
            type: "integer",
            notNull: true,
        },
        notes: { type: "text", notNull: false },
        created_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
        updated_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
    });
};


/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable("inventory_transactions");
};

