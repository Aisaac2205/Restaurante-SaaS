import { Request, Response } from 'express';
import sharp from 'sharp';
import { BunnyStorageService } from '../services/bunny-storage.service';

export class UploadController {
    private bunnyService: BunnyStorageService;

    constructor() {
        this.bunnyService = new BunnyStorageService();
    }

    /**
     * Sube una imagen de producto.
     */
    uploadProductImage = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.file) {
                res.status(400).json({ error: 'No se ha enviado ningún archivo.' });
                return;
            }

            // Optimizar imagen antes de subir
            await this.optimizeAndReplaceFile(req.file);

            const imageUrl = await this.bunnyService.uploadFile(req.file, 'products');
            res.json({ url: imageUrl });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al subir la imagen' });
        }
    };

    /**
     * Sube un logo o banner de restaurante.
     */
    uploadRestaurantImage = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.file) {
                res.status(400).json({ error: 'No se ha enviado ningún archivo.' });
                return;
            }

            // Optimizar imagen antes de subir
            await this.optimizeAndReplaceFile(req.file);

            const imageUrl = await this.bunnyService.uploadFile(req.file, 'restaurants');
            res.json({ url: imageUrl });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al subir la imagen' });
        }
    };

    /**
     * Sube un video para restaurantes (promo).
     * No optimiza con Sharp (no soporta video), sube directo a Bunny.
     */
    uploadRestaurantVideo = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.file) {
                res.status(400).json({ error: 'No se ha enviado ningún archivo.' });
                return;
            }

            // Subir directo a carpeta 'videos' en Bunny
            const videoUrl = await this.bunnyService.uploadFile(req.file, 'videos');
            res.json({ url: videoUrl });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al subir el video' });
        }
    };

    /**
     * Procesa la imagen con sharp:
     * - Resize max 800px width
     * - WebP format
     * - 80% quality
     * - Sin metadatos
     */
    private async optimizeAndReplaceFile(file: Express.Multer.File): Promise<void> {
        try {
            const optimizedBuffer = await sharp(file.buffer)
                .resize({ width: 800, withoutEnlargement: true })
                .webp({ quality: 80 })
                .toBuffer();

            file.buffer = optimizedBuffer;

            // Cambiar extensión a .webp
            const originalNameParts = file.originalname.split('.');
            if (originalNameParts.length > 1) {
                originalNameParts.pop(); // Quitar extensión actual
            }
            file.originalname = `${originalNameParts.join('.')}.webp`;

            // Actualizar mimetype
            file.mimetype = 'image/webp';

        } catch (error) {
            console.error('Error optimizando imagen con sharp:', error);
            // Si falla la optimización, podríamos decidir subir la original o lanzar error.
            // Por requisitos de "Objetivo Crítico", lanzamos error para investigar.
            throw new Error('ImageOptimizationError');
        }
    }
}
