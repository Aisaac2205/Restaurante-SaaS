import multer from 'multer';

import { Request } from 'express';

// Almacenar en memoria para procesamiento rápido sin I/O de disco
const storage = multer.memoryStorage();

// Filtro para aceptar solo imágenes
const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        // Rechazamos el archivo si no es imagen, pero no lanzamos error fatal, Multer lo maneja.
        // Podemos pasar un error si queremos que falle explícitamente.
        cb(new Error('Formato de archivo no válido. Solo JPG, PNG y WEBP permitidos.'));
    }
};

export const fileUploadMiddleware = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limite de 5MB
    },
});
