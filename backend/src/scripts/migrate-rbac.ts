import { query } from '../config/db';
import fs from 'fs';
import path from 'path';

const runMigration = async () => {
    try {
        console.log('Starting RBAC Migration...');
        const sqlPath = path.join(__dirname, '../../migrations/rbac_setup.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        // Execute the entire SQL block
        await query(sql);

        console.log('Migration executed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

runMigration();
