import clsx from 'clsx';
import { Eye } from 'lucide-react';

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface OrderSummary {
    id: string;
    customer: string;
    total: number;
    itemsCount: number;
    status: OrderStatus;
    time: string;
}

interface Props {
    orders: OrderSummary[];
    onViewOrder?: (id: string) => void;
}

const STATUS_STYLES: Record<OrderStatus, string> = {
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    preparing: 'bg-blue-50 text-blue-700 border-blue-200',
    ready: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    completed: 'bg-green-50 text-green-700 border-green-200',
    cancelled: 'bg-red-50 text-red-700 border-red-200',
};

const STATUS_LABELS: Record<OrderStatus, string> = {
    pending: 'Pendiente',
    preparing: 'En Preparación',
    ready: 'Listo',
    completed: 'Completado',
    cancelled: 'Cancelado',
};

export const RecentOrdersTable = ({ orders, onViewOrder }: Props) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Pedidos Recientes</h3>
                <button className="text-sm text-gray-500 hover:text-black font-medium">Ver todos</button>
            </div>

            {/* Desktop View (Table) */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-3">ID Pedido</th>
                            <th className="px-6 py-3">Cliente</th>
                            <th className="px-6 py-3">Total</th>
                            <th className="px-6 py-3">Estado</th>
                            <th className="px-6 py-3 text-right">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">#{order.id}</td>
                                <td className="px-6 py-4 text-gray-600">{order.customer}</td>
                                <td className="px-6 py-4 font-semibold text-gray-900">
                                    Q{order.total.toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={clsx(
                                        "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                        STATUS_STYLES[order.status]
                                    )}>
                                        {STATUS_LABELS[order.status]}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => onViewOrder?.(order.id)}
                                        className="text-gray-400 hover:text-black transition-colors"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {orders.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                    No hay pedidos recientes
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile View (Cards) */}
            <div className="md:hidden divide-y divide-gray-100">
                {orders.map((order) => (
                    <div key={order.id} className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="text-sm font-medium text-gray-900">#{order.id}</span>
                                <p className="text-sm text-gray-500">{order.customer}</p>
                            </div>
                            <span className={clsx(
                                "px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                STATUS_STYLES[order.status]
                            )}>
                                {STATUS_LABELS[order.status]}
                            </span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <span className="font-semibold text-gray-900">Q{order.total.toFixed(2)}</span>
                            <button
                                onClick={() => onViewOrder?.(order.id)}
                                className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 text-gray-600"
                            >
                                <Eye className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
                {orders.length === 0 && (
                    <div className="p-8 text-center text-gray-400 text-sm">
                        No hay pedidos recientes
                    </div>
                )}
            </div>
        </div>
    );
};
