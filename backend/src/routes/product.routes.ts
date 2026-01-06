import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { validateJWT } from '../middlewares/auth.middleware';

const router = Router();
const controller = new ProductController();

// Todas las rutas requieren autenticación
router.use(validateJWT);

router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
