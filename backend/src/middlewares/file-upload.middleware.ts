import multer from 'multer';

import { Request } from 'express';

// Almacenar en memoria para procesamiento rápido sin I/O de disco
const storage = multer.memoryStorage();

// Filtro para aceptar solo imágenes
const imageFileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Formato de archivo no válido. Solo JPG, PNG y WEBP permitidos.'));
    }
};

// Filtro para aceptar solo PDFs
const pdfFileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Formato de archivo no válido. Solo PDF permitido.'));
    }
};

export const fileUploadMiddleware = multer({
    storage,
    fileFilter: imageFileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limite de 5MB
    },
});

export const pdfUploadMiddleware = multer({
    storage,
    fileFilter: pdfFileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // Limite de 10MB para PDF (a veces son grandes)
    },
});
