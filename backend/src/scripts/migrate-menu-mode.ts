import pool from '../config/db';

/**
 * Migration: Add menu_mode and menu_pdf_url columns to restaurants table.
 * This enables hybrid menu functionality (Interactive or PDF).
 */
const migrateMenuMode = async () => {
    try {
        console.log('--- EXECUTING MENU MODE MIGRATION ---');

        await pool.query(`
            ALTER TABLE restaurants
            ADD COLUMN IF NOT EXISTS menu_mode VARCHAR(20) DEFAULT 'INTERACTIVE',
            ADD COLUMN IF NOT EXISTS menu_pdf_url TEXT NULL;
        `);

        console.log('✓ Added menu_mode column (default: INTERACTIVE)');
        console.log('✓ Added menu_pdf_url column (nullable)');
        console.log('Migration completed successfully.');

    } catch (error) {
        console.error('Error executing migration:', error);
    } finally {
        await pool.end();
    }
};

migrateMenuMode();
