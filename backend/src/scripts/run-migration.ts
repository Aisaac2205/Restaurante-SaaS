import fs from 'fs';
import path from 'path';
import pool from '../config/db';

const runMigration = async () => {
    try {
        const migrationPath = path.join(__dirname, '../../migrations/update_landing_page.sql');

        if (!fs.existsSync(migrationPath)) {
            console.error('Migration file not found:', migrationPath);
            return;
        }

        const migrationSql = fs.readFileSync(migrationPath, 'utf8');

        console.log('--- EJECTUANDO MIGRACIÓN ---');
        console.log(`Archivo: ${migrationPath}`);

        await pool.query(migrationSql);

        console.log('Migración completada exitosamente.');
        console.log('Columnas agregadas a la tabla restaurants.');

    } catch (error) {
        console.error('Error ejecutando migración:', error);
    } finally {
        await pool.end();
    }
};

runMigration();
