import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

export const db = knex({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    pool: {
        min: 2,
        max: 10
    }
});

// Test connection
db.raw('SELECT 1')
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((e) => {
        console.error('Database connection failed:', e);
    });