import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { validateJWT } from '../middlewares/auth.middleware';

const router = Router();
const controller = new CategoryController();

// Todas las rutas requieren autenticación
router.use(validateJWT);

router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
