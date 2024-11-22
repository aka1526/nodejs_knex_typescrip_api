import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('products', (table) => {
        
        table.uuid('uuid').primary();
        table.string('name',200).nullable();
        table.text('description').nullable();
        table.decimal('sale_price', 10, 2).notNullable().defaultTo(0);
        table.decimal('purchase_price', 10, 2).notNullable().defaultTo(0)   ;
        table.enum('status', ['active', 'inactive']).defaultTo('active');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('products');
}