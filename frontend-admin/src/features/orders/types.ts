export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface OrderItem {
    name: string;
    quantity: number;
    notes?: string;
}

export interface Order {
    id: string;
    customerName: string;
    total: number;
    status: OrderStatus;
    items: OrderItem[];
    createdAt: Date;
    tableNumber?: string; // or 'Delivery'
    paymentMethod: 'cash' | 'card';
}
