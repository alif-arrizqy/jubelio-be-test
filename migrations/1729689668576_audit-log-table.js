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
    pgm.createTable('audit_trail', {
        id: 'id',
        method: { type: 'varchar(10)', notNull: true },
        url: { type: 'varchar(255)', notNull: true },
        payload: { type: 'json', notNull: false },
        user: { type: 'varchar(100)', notNull: true },
        action_type: { type: 'varchar(10)', notNull: true },
        created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') }
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('audit_trail');
};
