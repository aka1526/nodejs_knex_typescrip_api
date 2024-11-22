import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('products', (table) => {
        table.index('name', 'idx_products_name');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('products', (table) => {
        table.dropIndex('name', 'idx_products_name');
    });
}

