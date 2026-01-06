import { OrderRepository } from '../repositories/order.repository';
import { IOrder } from '../interfaces/models';

export class OrderService {
    private orderRepository: OrderRepository;

    constructor() {
        this.orderRepository = new OrderRepository();
    }

    async createOrder(data: {
        restaurant_id: number;
        customer_name: string;
        // table_number?: string;
        total: number;
        status: 'pending';
        payment_method: 'cash' | 'card';
        delivery_method: 'pickup' | 'delivery';
        delivery_address?: string;
        items: {
            product_id: number;
            quantity: number;
            price: number;
            subtotal: number;
        }[];
    }): Promise<IOrder> {
        // 1. Create Order
        const order = await this.orderRepository.createOrder({
            restaurant_id: data.restaurant_id,
            customer_name: data.customer_name,
            total: data.total,
            status: 'pending',
            payment_method: data.payment_method,
            delivery_method: data.delivery_method,
            delivery_address: data.delivery_address
        });

        // 2. Create Order Items
        for (const item of data.items) {
            await this.orderRepository.createOrderItem(
                order.id,
                item.product_id,
                item.quantity,
                item.price,
                item.subtotal
            );
        }

        // 3. Return full order with items
        const items = await this.orderRepository.getOrderItems(order.id);
        return { ...order, items };
    }

    async getOrdersByRestaurant(restaurant_id: number, filters?: { status?: string | string[] }): Promise<IOrder[]> {
        const orders = await this.orderRepository.findByRestaurantId(restaurant_id, filters);

        // Populate items for each order (Batching would be better but this is MVP)
        const ordersWithItems = await Promise.all(orders.map(async (order) => {
            const items = await this.orderRepository.getOrderItems(order.id);
            return { ...order, items };
        }));

        return ordersWithItems;
    }

    async updateStatus(id: number, status: string): Promise<IOrder | null> {
        const order = await this.orderRepository.updateStatus(id, status);
        if (order) {
            const items = await this.orderRepository.getOrderItems(id);
            return { ...order, items };
        }
        return null;
    }

    async getDashboardStats(restaurant_id: number) {
        // Get raw stats from repository
        const stats = await this.orderRepository.getStats(restaurant_id);

        // Add calculated fields (e.g. average ticket)
        const avg_ticket = stats.total_orders > 0
            ? stats.total_sales / stats.total_orders
            : 0;

        return {
            ...stats,
            avg_ticket,
            // Mock trends for MVP - in V2 implement historical comparison
            trends: {
                sales: { value: '+0%', trend: 'neutral' },
                orders: { value: '+0', trend: 'neutral' },
                customers: { value: 'Active', trend: 'neutral' },
                ticket: { value: '0%', trend: 'neutral' }
            }
        };
    }
}
