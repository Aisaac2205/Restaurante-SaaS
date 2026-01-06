import fs from 'fs';
import path from 'path';
import pool from '../config/db';

const seedDatabase = async () => {
    try {
        const schemaPath = path.join(__dirname, '../../migrations/schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('Ejecutando schema.sql...');
        await pool.query(schemaSql);
        console.log('Base de datos inicializada correctamente.');

        // Verificar inserción
        const result = await pool.query('SELECT count(*) FROM restaurants');
        console.log(`Restaurantes encontrados: ${result.rows[0].count}`);

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await pool.end();
    }
};

seedDatabase();
