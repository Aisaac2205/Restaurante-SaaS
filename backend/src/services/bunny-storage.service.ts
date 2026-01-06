import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { envs } from '../config/envs';

export class BunnyStorageService {

    /**
     * Sube un archivo a Bunny Storage y retorna la URL pública.
     * @param file Archivo subido via Multer (en memoria)
     * @param folder Carpeta destino (ej: 'restaurants', 'products')
     * @returns URL pública del archivo
     */
    async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
        try {
            // 1. Generar nombre único: uuid + extensión original
            const fileExtension = file.originalname.split('.').pop();
            const fileName = `${uuidv4()}.${fileExtension}`;

            // 2. Construir URL de subida (Storage API)
            // Fix: User provided "la.storage.bunnycdn" (missing .com). Auto-fix common issues.
            let host = envs.BUNNY_STORAGE_HOST || 'storage.bunnycdn.com';
            if (host === 'la.storage.bunnycdn') {
                host = 'la.storage.bunnycdn.com';
            }

            // Formato: https://{Host}/{StorageZoneName}/{Path}/{FileName}
            // Ensure zoneName is correct.
            const storageUrl = `https://${host}/${envs.BUNNY_STORAGE_ZONE_NAME}/${folder}/${fileName}`;

            // Log de depuración para verificar la URL generada
            console.log(`[BunnyStorage] Uploading to: ${storageUrl}`);

            // 3. Subir archivo usando Axios PUT
            await axios.put(storageUrl, file.buffer, {
                headers: {
                    AccessKey: envs.BUNNY_STORAGE_API_KEY,
                    'Content-Type': 'application/octet-stream',
                },
            });

            // 4. Retornar URL pública (CDN)
            const cleanCdnUrl = envs.BUNNY_CDN_URL.replace(/\/$/, '');
            return `${cleanCdnUrl}/${folder}/${fileName}`;

        } catch (error) {
            console.error('Error subiendo archivo a Bunny.net:', error);
            if (axios.isAxiosError(error)) {
                console.error('Bunny Response:', error.response?.data);
            }
            throw new Error('ErrorUploadImage');
        }
    }
}
