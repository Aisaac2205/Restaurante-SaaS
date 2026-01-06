import pool from '../config/db';
import fs from 'fs';
import path from 'path';

async function run() {
    try {
        const sqlPath = path.join(__dirname, '../../update-localization.sql');
        console.log('Reading SQL from:', sqlPath);
        const sql = fs.readFileSync(sqlPath, 'utf8');
        console.log('Running SQL localization...');
        await pool.query(sql);
        console.log('Success! Database updated with localized content.');
    } catch (e) {
        console.error('Error running localization:', e);
    } finally {
        await pool.end();
    }
}

run();
