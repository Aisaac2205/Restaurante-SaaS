import { Router } from 'express';
import { UploadController } from '../controllers/upload.controller';
import { validateJWT } from '../middlewares/auth.middleware';
import { fileUploadMiddleware } from '../middlewares/file-upload.middleware';
import { videoUploadMiddleware } from '../middlewares/video-upload.middleware';

const router = Router();
const uploadController = new UploadController();

// Todas las rutas de subida requieren Autenticación
router.use(validateJWT);

/**
 * POST /api/files/product
 * Sube una imagen para productos.
 * Field name esperado en form-data: "image"
 */
router.post('/product', fileUploadMiddleware.single('image'), uploadController.uploadProductImage);

/**
 * POST /api/files/restaurant
 * Sube una imagen para restaurantes (logo/banner).
 */
router.post('/restaurant', fileUploadMiddleware.single('image'), uploadController.uploadRestaurantImage);

/**
 * POST /api/files/video
 * Sube un video promocional.
 * Field name esperado en form-data: "video"
 */
router.post('/video', videoUploadMiddleware.single('video'), uploadController.uploadRestaurantVideo);

/**
 * POST /api/files/menu-pdf
 * Sube un PDF de menú.
 * Field name esperado en form-data: "pdf"
 */
router.post('/menu-pdf', fileUploadMiddleware.single('pdf'), uploadController.uploadMenuPdf);

export default router;
