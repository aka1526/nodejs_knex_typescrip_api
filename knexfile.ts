import type { Knex } from 'knex';
import dotenv from 'dotenv';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dotenv.config();

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Bangkok');

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'your_database_name',
            timezone: 'Asia/Bangkok',
            typeCast: function (field: any, next: any) {
                if (field.type === 'DATETIME' || field.type === 'TIMESTAMP') {
                    return field.string();
                }
                return next();
            }
        },
        migrations: {
            directory: './src/database/migrations',
        },
        seeds: {
            directory: './src/database/seeds',
        }
    }
};

export default config; 