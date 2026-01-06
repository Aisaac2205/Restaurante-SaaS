import { query } from '../config/db';

async function runMigration() {
    try {
        console.log('Adding theme_mode column to restaurants table...');

        await query(`
            ALTER TABLE restaurants
            ADD COLUMN IF NOT EXISTS theme_mode VARCHAR(50) DEFAULT 'v1-urban';
        `);

        console.log('Migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

runMigration();
