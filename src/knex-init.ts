import dotenv from 'dotenv';
import { Knex } from 'knex';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: 'trello_clone',
        },
        migrations: {
            directory: './src/migrations',
        },
        seeds: {
            directory: './src/seeds',
        },
    },
};

export default config;