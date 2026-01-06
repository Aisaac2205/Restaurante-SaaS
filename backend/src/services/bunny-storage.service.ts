import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { envs } from '../config/envs';

export class BunnyStorageService {

    /**
     * Get the properly formatted storage host
     */
    private getStorageHost(): string {
        let host = envs.BUNNY_STORAGE_HOST || 'storage.bunnycdn.com';
        if (host === 'la.storage.bunnycdn') {
            host = 'la.storage.bunnycdn.com';
        }
        return host;
    }

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
            const host = this.getStorageHost();

            // Formato: https://{Host}/{StorageZoneName}/{Path}/{FileName}
            const storageUrl = `https://${host}/${envs.BUNNY_STORAGE_ZONE_NAME}/${folder}/${fileName}`;

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

    /**
     * Sube un archivo PDF sin procesamiento.
     * @param file Archivo PDF subido via Multer
     * @returns URL pública del PDF
     */
    async uploadPdf(file: Express.Multer.File): Promise<string> {
        try {
            const fileName = `${uuidv4()}.pdf`;
            const host = this.getStorageHost();
            const storageUrl = `https://${host}/${envs.BUNNY_STORAGE_ZONE_NAME}/menus/${fileName}`;

            console.log(`[BunnyStorage] Uploading PDF to: ${storageUrl}`);

            await axios.put(storageUrl, file.buffer, {
                headers: {
                    AccessKey: envs.BUNNY_STORAGE_API_KEY,
                    'Content-Type': 'application/pdf',
                },
            });

            const cleanCdnUrl = envs.BUNNY_CDN_URL.replace(/\/$/, '');
            return `${cleanCdnUrl}/menus/${fileName}`;

        } catch (error) {
            console.error('Error uploading PDF to Bunny.net:', error);
            if (axios.isAxiosError(error)) {
                console.error('Bunny Response:', error.response?.data);
            }
            throw new Error('ErrorUploadPdf');
        }
    }

    /**
     * Elimina un archivo de Bunny Storage dado su URL pública.
     * Usado para limpiar archivos viejos cuando se reemplazan.
     * @param publicUrl URL pública del archivo (CDN URL)
     */
    async deleteFile(publicUrl: string): Promise<void> {
        try {
            if (!publicUrl) return;

            // Extract path from CDN URL
            // Example: https://restaurant.b-cdn.net/restaurants/abc.webp -> restaurants/abc.webp
            const cdnBase = envs.BUNNY_CDN_URL.replace(/\/$/, '');
            const filePath = publicUrl.replace(cdnBase + '/', '');

            if (!filePath || filePath === publicUrl) {
                console.warn('[BunnyStorage] Could not extract path from URL:', publicUrl);
                return;
            }

            const host = this.getStorageHost();
            const storageUrl = `https://${host}/${envs.BUNNY_STORAGE_ZONE_NAME}/${filePath}`;

            console.log(`[BunnyStorage] Deleting: ${storageUrl}`);

            await axios.delete(storageUrl, {
                headers: {
                    AccessKey: envs.BUNNY_STORAGE_API_KEY,
                },
            });

            console.log(`[BunnyStorage] Deleted successfully: ${filePath}`);

        } catch (error) {
            // Don't throw - deletion failure shouldn't block the update
            console.error('Error deleting file from Bunny.net:', error);
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                console.log('[BunnyStorage] File already deleted or not found');
            }
        }
    }
}

