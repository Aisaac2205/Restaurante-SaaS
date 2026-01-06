import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno
dotenv.config({ path: path.join(__dirname, '../../.env') });

const pool = new Pool(
    process.env.DATABASE_URL
        ? {
            connectionString: process.env.DATABASE_URL,
            ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        }
        : {
            user: process.env.DB_USER || 'postgres',
            host: process.env.DB_HOST || 'localhost',
            database: process.env.DB_NAME || 'restaurant_saas',
            password: process.env.DB_PASSWORD || 'postgres',
            port: parseInt(process.env.DB_PORT || '5432', 10),
        }
);

/**
 * Función para ejecutar queries con tipado genérico
 */
export const query = async <T>(text: string, params?: (string | number | boolean | null | undefined | Date)[]): Promise<T[]> => {
    const result = await pool.query(text, params);
    return result.rows;
};

// Evento de error en el pool para evitar caídas inesperadas
pool.on('error', (err) => {
    console.error('Error inesperado e cliente de PostgreSQL', err);
    process.exit(-1);
});

export default pool;
