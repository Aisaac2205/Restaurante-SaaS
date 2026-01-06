import { Router } from 'express';
import { MenuController } from '../controllers/menu.controller';

const router = Router();
const menuController = new MenuController();

// Definimos la ruta y bindeamos el método para no perder el contexto 'this'
router.get('/:slug', menuController.getMenu);

export default router;
