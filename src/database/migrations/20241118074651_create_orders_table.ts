import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('orders', (table) => {
       
        table.uuid('uuid').primary();
        table.string('order_number',50).nullable();
        table.integer('user_id').unsigned().notNullable();
        table.decimal('total_amount', 10, 2).notNullable();
        table.enum('status', ['pending', 'paid', 'shipped', 'delivered', 'cancelled'])
            .defaultTo('pending');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        
   
    });

    // สร้างตาราง order_items สำหรับเก็บรายการสินค้าในแต่ละ order
    await knex.schema.createTable('order_items', (table) => {
        table.uuid('uuid').primary();
        table.string('refe_order_number',50).nullable().defaultTo('');
        table.integer('item') .notNullable().defaultTo(0);
        table.string('product_id',50).nullable().defaultTo('');
        table.integer('quantity').notNullable().defaultTo(0);
        table.decimal('price', 10, 2).notNullable().defaultTo(0);
        table.timestamp('created_at').defaultTo(knex.fn.now());
 
    });
}

export async function down(knex: Knex): Promise<void> {
    // ต้อง drop ตาราง order_items ก่อนเพราะมี foreign key ไปยัง orders
    await knex.schema.dropTable('order_items');
    await knex.schema.dropTable('orders');
}