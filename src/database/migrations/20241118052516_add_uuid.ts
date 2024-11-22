import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('users', (table) => {
        // เพิ่ม UUID column
        table.uuid('uuid').unique().notNullable().after('id');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('users', (table) => {
        table.dropColumn('uuid');
    });
}