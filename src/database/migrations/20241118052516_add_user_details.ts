import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('users', (table) => {
        table.string('firstname').nullable().after('password');
        table.string('lastname').nullable().after('firstname');
        table.enum('role', ['admin', 'user']).defaultTo('user').after('lastname');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('users', (table) => {
        table.dropColumn('firstname');
        table.dropColumn('lastname');
        table.dropColumn('role');
    });
}

