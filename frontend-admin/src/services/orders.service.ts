import api from '../api/axios';
import type { Order, OrderStatus } from '../features/orders/types';

interface BackendOrder {
    id: number;
    customer_name: string;
    total: string | number;
    status: OrderStatus;
    created_at: string;
    table_number?: string;
    payment_method: 'cash' | 'card';
    items: {
        product_name: string;
        quantity: number;
    }[];
}

export const ordersService = {
    getOrders: async (view: 'active' | 'history' = 'active'): Promise<Order[]> => {
        const response = await api.get<BackendOrder[]>('/orders', { params: { view } });
        return response.data.map((o) => ({
            id: String(o.id),
            customerName: o.customer_name,
            total: Number(o.total),
            status: o.status,
            createdAt: new Date(o.created_at),
            tableNumber: o.table_number || 'Delivery',
            paymentMethod: o.payment_method,
            items: o.items.map((i) => ({
                name: i.product_name || 'Item',
                quantity: i.quantity,
                notes: ''
            }))
        }));
    },

    updateStatus: async (orderId: string, status: OrderStatus): Promise<Order> => {
        const response = await api.patch(`/orders/${orderId}/status`, { status });
        // Return mapped order if needed, or just void
        const o = response.data as BackendOrder;
        return {
            id: String(o.id),
            customerName: o.customer_name,
            total: Number(o.total),
            status: o.status,
            createdAt: new Date(o.created_at),
            tableNumber: o.table_number || 'Delivery',
            paymentMethod: o.payment_method,
            items: o.items.map((i) => ({
                name: i.product_name || 'Item',
                quantity: i.quantity,
                notes: ''
            }))
        };
    }
};
