import pool from '../config/db';

const listTenants = async () => {
    try {
        const result = await pool.query('SELECT name, slug FROM restaurants');
        console.log('--- RESTAURANTS ---');
        result.rows.forEach(r => {
            console.log(`Name: ${r.name}, Slug: ${r.slug}`);
        });
        console.log('-------------------');
    } catch (error) {
        console.error('Error listing tenants:', error);
    } finally {
        await pool.end();
    }
};

listTenants();
