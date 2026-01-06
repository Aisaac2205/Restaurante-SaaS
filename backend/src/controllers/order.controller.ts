import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';

export class OrderController {
    private orderService: OrderService;

    constructor() {
        this.orderService = new OrderService();
    }

    createOrder = async (req: Request, res: Response): Promise<void> => {
        try {
            // Data validation should be handled by middleware/Zod ideally
            const order = await this.orderService.createOrder(req.body);
            res.status(201).json(order);
        } catch (error) {
            console.error('Error creating order:', error);
            res.status(500).json({ error: 'Failed to create order' });
        }
    };

    getOrders = async (req: Request, res: Response): Promise<void> => {
        try {
            // Assuming restaurantId is attached to req by Auth middleware, OR passed as query param (Admin context)
            // For Admin (Restaurant Owner), they are logged in.
            // Middleware attaches user to req
            const user = req.user;
            if (!user) {
                res.status(401).json({ error: 'Unauthorized: User context missing' });
                return;
            }
            const restaurantId = user.id;
            const view = req.query.view as string; // 'active' | 'history'

            let filters: { status?: string[] } = {};
            if (view === 'active') {
                filters.status = ['pending', 'preparing', 'ready'];
            } else if (view === 'history') {
                filters.status = ['completed', 'cancelled', 'delivered']; // Added delivered just in case
            }

            const orders = await this.orderService.getOrdersByRestaurant(restaurantId, filters);
            res.json(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).json({ error: 'Failed to fetch orders' });
        }
    };

    updateStatus = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const order = await this.orderService.updateStatus(Number(id), status);
            if (!order) {
                res.status(404).json({ error: 'Order not found' });
                return;
            }
            res.json(order);
        } catch (error) {
            console.error('Error updating order status:', error);
            res.status(500).json({ error: 'Failed to update order status' });
        }
    };

    getStats = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = req.user;
            if (!user) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }
            // For now assume user.id is restaurant_id, or use user.restaurant_id if available
            // In a real multi-tenant app, user would belong to a restaurant.
            const stats = await this.orderService.getDashboardStats(user.id);
            res.json(stats);
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            res.status(500).json({ error: 'Failed to fetch dashboard stats' });
        }
    };
}
