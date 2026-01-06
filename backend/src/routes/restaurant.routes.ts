import { Router } from 'express';
import { RestaurantController } from '../controllers/restaurant.controller';
import { validateJWT } from '../middlewares/auth.middleware';

const router = Router();
const controller = new RestaurantController();

router.use(validateJWT);

router.get('/me', controller.getMe);
router.put('/me', controller.updateSettings);

// Super Admin
router.get('/', controller.getAllRestaurants);
router.post('/', controller.createRestaurant);
router.get('/:id', controller.getById);
router.put('/:id', controller.updateById);

export default router;
