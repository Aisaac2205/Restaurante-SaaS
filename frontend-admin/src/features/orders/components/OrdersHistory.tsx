import type { Order } from '../types';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import clsx from 'clsx';

interface Props {
    orders: Order[];
}

export const OrdersHistory = ({ orders }: Props) => {
    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <Clock className="w-12 h-12 mb-3 text-gray-300" />
                <p>No hay historial de pedidos recientes</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">Cliente</th>
                            <th className="px-6 py-3">Fecha</th>
                            <th className="px-6 py-3">Total</th>
                            <th className="px-6 py-3">Estado</th>
                            <th className="px-6 py-3">Items</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">#{order.id}</td>
                                <td className="px-6 py-4">{order.customerName}</td>
                                <td className="px-6 py-4 text-gray-500">
                                    {order.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    <span className="block text-xs">{order.createdAt.toLocaleDateString()}</span>
                                </td>
                                <td className="px-6 py-4 font-medium">Q{order.total.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <span className={clsx(
                                        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium",
                                        order.status === 'completed'
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    )}>
                                        {order.status === 'completed' ? (
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                        ) : (
                                            <XCircle className="w-3.5 h-3.5" />
                                        )}
                                        {order.status === 'completed' ? 'Entregado' : 'Cancelado'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                                    {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
