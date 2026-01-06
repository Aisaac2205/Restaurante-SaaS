import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { validateJWT } from '../middlewares/auth.middleware';

const router = Router();
const orderController = new OrderController();

// Public Route (Client) - No Auth required (or maybe Client Token?)
// For now, assume Public. But wait, how do we know which restaurant it is?
// Req body must contain restaurant_id.
router.post('/', orderController.createOrder);

// Private Routes (Admin)
router.use(validateJWT);
router.get('/stats', orderController.getStats);
router.get('/', orderController.getOrders);
router.patch('/:id/status', orderController.updateStatus);

export default router;
