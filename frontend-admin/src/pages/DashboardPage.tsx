import { DollarSign, ShoppingBag, Users, TrendingUp, Loader2 } from 'lucide-react';
import { StatsCard } from '../features/dashboard/components/StatsCard';
import { DashboardCharts } from '../features/dashboard/components/DashboardCharts';
import { RecentOrdersTable, type OrderSummary } from '../features/dashboard/components/RecentOrdersTable';
import { useDashboard } from '../features/dashboard/hooks/useDashboard';

export const DashboardPage = () => {
    const { stats, loading, error } = useDashboard();

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
        );
    }

    if (error || !stats) {
        return (
            <div className="p-8 text-center text-red-500 bg-red-50 rounded-lg">
                <p>{error || 'No se pudieron cargar los datos'}</p>
            </div>
        );
    }

    const statCards = [
        {
            title: 'Ventas Totales',
            value: `Q${stats.total_sales.toFixed(2)}`,
            icon: DollarSign,
            trend: stats.trends.sales.trend,
            desc: stats.trends.sales.value
        },
        {
            title: 'Pedidos',
            value: stats.total_orders.toString(),
            icon: ShoppingBag,
            trend: stats.trends.orders.trend,
            desc: stats.trends.orders.value
        },
        {
            title: 'Clientes',
            value: stats.total_customers.toString(),
            icon: Users,
            trend: stats.trends.customers.trend,
            desc: stats.trends.customers.value
        },
        {
            title: 'Ticket Promedio',
            value: `Q${stats.avg_ticket.toFixed(2)}`,
            icon: TrendingUp,
            trend: stats.trends.ticket.trend,
            desc: stats.trends.ticket.value
        },
    ];

    const recentOrders: OrderSummary[] = stats.recent_orders.map(order => ({
        id: order.id.toString(),
        customer: order.customer_name,
        total: typeof order.total_amount === 'string' ? parseFloat(order.total_amount) : order.total_amount,
        itemsCount: 0, // Backend doesn't send item count in summary yet, 0 for now
        status: order.status,
        time: new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));

    return (
        <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Panel de Control</h1>
                <p className="mt-1 text-gray-500">Resumen general de tu restaurante</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <StatsCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                        trend={stat.trend}
                        description={stat.desc}
                    />
                ))}
            </div>

            {/* Visual Charts Section (Epic Monochrome) */}
            <DashboardCharts />

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Orders Table (Takes 2 columns) */}
                <div className="lg:col-span-2 space-y-6">
                    <RecentOrdersTable orders={recentOrders} />
                </div>

                {/* Quick Actions / Notifications (Takes 1 column) */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
                        <div className="space-y-3">
                            <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-black hover:text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-between group">
                                <span>Nuevo Pedido Manual</span>
                                <span className="text-gray-400 group-hover:text-gray-300">→</span>
                            </button>
                            <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-black hover:text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-between group">
                                <span>Actualizar Menú</span>
                                <span className="text-gray-400 group-hover:text-gray-300">→</span>
                            </button>
                            <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-black hover:text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-between group">
                                <span>Ver Reportes</span>
                                <span className="text-gray-400 group-hover:text-gray-300">→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
