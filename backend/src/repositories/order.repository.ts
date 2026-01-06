import { query } from '../config/db';
import { IOrder } from '../interfaces/models';

export class OrderRepository {

    async createOrder(data: Omit<IOrder, 'id' | 'created_at' | 'updated_at' | 'items'> & { delivery_address?: string; delivery_method?: string; total: number }): Promise<IOrder> {
        const { restaurant_id, customer_name, total, status, payment_method, delivery_address, delivery_method } = data;
        const result = await query<IOrder>(`
            INSERT INTO orders (restaurant_id, customer_name, total_amount, status, payment_method, delivery_address, delivery_method, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
            RETURNING *
        `, [restaurant_id, customer_name, total, status, payment_method, delivery_address, delivery_method || 'pickup']);
        return result[0];
    }

    async createOrderItem(order_id: number, product_id: number, quantity: number, price: number, subtotal: number): Promise<void> {
        await query(`
            INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal)
            VALUES ($1, $2, $3, $4, $5)
        `, [order_id, product_id, quantity, price, subtotal]);
    }

    async findByRestaurantId(restaurant_id: number, filters?: { status?: string | string[] }): Promise<IOrder[]> {
        let queryStr = `SELECT * FROM orders WHERE restaurant_id = $1`;
        const params: any[] = [restaurant_id];

        if (filters?.status) {
            if (Array.isArray(filters.status)) {
                // Handle multiple statuses (e.g. ['pending', 'preparing', 'ready'])
                // Create placeholders like $2, $3, $4
                const placeholders = filters.status.map((_, idx) => `$${idx + 2}`).join(', ');
                queryStr += ` AND status IN (${placeholders})`;
                params.push(...filters.status);
            } else {
                params.push(filters.status);
                queryStr += ` AND status = $2`;
            }
        }

        queryStr += ` ORDER BY created_at DESC`;

        // Add Limit for history to prevent massive loads
        if (filters?.status && (Array.isArray(filters.status) ? filters.status.includes('completed') : filters.status === 'completed')) {
            queryStr += ` LIMIT 100`; // Soft limit for now
        }

        const orders = await query<IOrder>(queryStr, params);
        return orders;
    }

    async findById(id: number): Promise<IOrder | null> {
        const result = await query<IOrder>('SELECT * FROM orders WHERE id = $1', [id]);
        return result[0] || null;
    }

    async getOrderItems(order_id: number): Promise<any[]> {
        // Join with products to get current name/image if needed, or rely on snapshot if we stored it (we didn't store name in order_items table in migration, but we should have? 
        // Wait, migration had product_id. Let's join products to get name.
        // Actually, migration PLAN said "product_name" in order_items, but script implementation... let me check script.
        // Script: product_id INTEGER NOT NULL REFERENCES products(id). NO product_name column.
        // So we join.
        return await query(`
            SELECT oi.*, p.name as product_name, p.image_url 
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = $1
        `, [order_id]);
    }

    async updateStatus(id: number, status: string): Promise<IOrder | null> {
        const result = await query<IOrder>(`
            UPDATE orders 
            SET status = $2, updated_at = NOW()
            WHERE id = $1
            RETURNING *
        `, [id, status]);
        return result[0] || null;
    }

    async getStats(restaurant_id: number) {
        // 1. Basic Stats (Sales, Orders, Customers)
        const stats = await query<{ total_sales: string, total_orders: string, total_customers: string }>(`
            SELECT 
                COALESCE(SUM(total_amount), 0) as total_sales,
                COUNT(*) as total_orders,
                COUNT(DISTINCT customer_name) as total_customers
            FROM orders 
            WHERE restaurant_id = $1 AND status != 'cancelled'
        `, [restaurant_id]);

        // 2. Recent Orders
        const recentOrders = await query<IOrder>(`
            SELECT * FROM orders 
            WHERE restaurant_id = $1 
            ORDER BY created_at DESC 
            LIMIT 5
        `, [restaurant_id]);

        return {
            ...stats[0],
            total_sales: parseFloat(stats[0].total_sales || '0'),
            total_orders: parseInt(stats[0].total_orders || '0'),
            total_customers: parseInt(stats[0].total_customers || '0'),
            recent_orders: recentOrders
        };
    }
}
