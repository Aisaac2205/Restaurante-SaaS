import multer from 'multer';
import { Request } from 'express';

// Almacenar en memoria.
// NOTA: Para archivos muy grandes (100MB+), memoria podría ser ineficiente.
// Pero para este caso de uso (videos promo cortos < 100MB) es aceptable en Railway/VPS estándar.
const storage = multer.memoryStorage();

const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimeTypes = [
        'video/mp4',
        'video/webm',
        'video/quicktime', // .mov
        'video/x-msvideo'  // .avi
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Formato de archivo no válido. Solo MP4, WEBM, MOV permitidos.'));
    }
};

export const videoUploadMiddleware = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024, // Limite de 100MB
    },
});
