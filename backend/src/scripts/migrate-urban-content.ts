
import { query } from '../config/db';

const runMigration = async () => {
    try {
        console.log('Starting migration...');

        await query(`
            ALTER TABLE restaurants 
            ADD COLUMN IF NOT EXISTS content_section_2_image TEXT,
            ADD COLUMN IF NOT EXISTS content_section_2_title TEXT,
            ADD COLUMN IF NOT EXISTS content_section_2_body TEXT;
        `);

        console.log('Migration completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

runMigration();
