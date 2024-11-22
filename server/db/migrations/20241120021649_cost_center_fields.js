/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  return knex.schema.table('card', (table) => {
    table.string('revenue').notNullable().defaultTo(0);
    table.string('purchase_cost').notNullable().defaultTo(0);
    table.string('sale_price').notNullable().defaultTo(0);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  return knex.schema.table('card', (table) => {
    table.dropColumn('revenue');
    table.dropColumn('purchase_cost');
    table.dropColumn('sale_price');
  });
};
