import { Pool } from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined
});

async function runMigration() {
    try {
        console.log('Connecting to database...');
        const client = await pool.connect();

        try {
            console.log('Reading migration file...');
            const sqlPath = path.join(__dirname, '../../alter_restaurants_checkout.sql');
            const sql = fs.readFileSync(sqlPath, 'utf8');

            console.log('Executing migration...');
            await client.query(sql);

            console.log('Migration completed successfully.');
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

runMigration();
