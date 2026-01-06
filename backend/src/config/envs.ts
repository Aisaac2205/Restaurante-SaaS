import dotenv from 'dotenv';
import path from 'path';

// Asegurar carga de .env
dotenv.config({ path: path.join(__dirname, '../../.env') });

export const envs = {
    PORT: process.env.PORT || 3000,

    // Bunny CDN Config
    BUNNY_STORAGE_API_KEY: process.env.BUNNY_STORAGE_ACCESS_KEY || '',
    BUNNY_STORAGE_ZONE_NAME: process.env.BUNNY_STORAGE_ZONE || '',
    BUNNY_CDN_URL: process.env.BUNNY_CDN_BASE_URL || '',
    BUNNY_STORAGE_HOST: process.env.BUNNY_STORAGE_HOST || 'storage.bunnycdn.com',
};

// Validación simple al arrancar
if (!envs.BUNNY_STORAGE_API_KEY || !envs.BUNNY_STORAGE_ZONE_NAME || !envs.BUNNY_CDN_URL) {
    console.warn('Advertencia: Las variables de entorno de Bunny.net no están completamente configuradas.');
}
