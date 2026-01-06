export interface DashboardStats {
    total_sales: number;
    total_orders: number;
    total_customers: number;
    avg_ticket: number;
    recent_orders: RecentOrder[];
    trends: {
        sales: Trend;
        orders: Trend;
        customers: Trend;
        ticket: Trend;
    };
}

export interface RecentOrder {
    id: number;
    customer_name: string;
    total_amount: number; // string from DB but parsed to number
    status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
    created_at: string;
    items?: unknown[]; // Simplified for now
}

export interface Trend {
    value: string;
    trend: 'up' | 'down' | 'neutral';
}
