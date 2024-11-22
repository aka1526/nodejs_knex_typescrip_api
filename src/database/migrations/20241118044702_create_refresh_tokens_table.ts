import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('refresh_tokens', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.string('token').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('refresh_tokens');
}