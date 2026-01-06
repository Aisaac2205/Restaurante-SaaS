import { Clock, CheckCircle, ChefHat, Package, XCircle } from 'lucide-react';
import type { Order, OrderStatus } from '../types';
import clsx from 'clsx';

interface Props {
    order: Order;
    onStatusChange: (id: string, status: OrderStatus) => void;
}

export const OrderCard = ({ order, onStatusChange }: Props) => {

    // Status Logic Helpers
    const getNextStatus = (current: OrderStatus): OrderStatus | null => {
        if (current === 'pending') return 'preparing';
        if (current === 'preparing') return 'ready';
        if (current === 'ready') return 'completed';
        return null;
    };

    const nextStatus = getNextStatus(order.status);
    const elapsedTime = Math.floor((new Date().getTime() - order.createdAt.getTime()) / 60000); // Minutes

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <div>
                    <span className="text-xs font-bold text-gray-500">#{order.id}</span>
                    <h4 className="font-semibold text-gray-900">{order.customerName}</h4>
                    {order.tableNumber && (
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                            Mesa {order.tableNumber}
                        </span>
                    )}
                </div>
                <div className={clsx("flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full", {
                    'bg-yellow-100 text-yellow-800': elapsedTime > 15 && order.status !== 'completed',
                    'bg-gray-100 text-gray-600': elapsedTime <= 15 || order.status === 'completed'
                })}>
                    <Clock className="w-3 h-3" />
                    {elapsedTime} min
                </div>
            </div>

            {/* Items */}
            <ul className="space-y-1 mb-4">
                {order.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex justify-between">
                        <span>
                            <span className="font-bold mr-2">{item.quantity}x</span>
                            {item.name}
                        </span>
                    </li>
                ))}
            </ul>

            {/* Total */}
            <div className="border-t border-gray-100 pt-3 flex justify-between items-center mb-3">
                <span className="text-xs text-gray-400 font-mono uppercase">{order.paymentMethod}</span>
                <span className="font-bold text-gray-900">Q{(Number(order.total) || 0).toFixed(2)}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                {order.status !== 'cancelled' && order.status !== 'completed' && (
                    <button
                        onClick={() => nextStatus && onStatusChange(order.id, nextStatus)}
                        className="flex-1 bg-black text-white text-xs font-medium py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                        {order.status === 'pending' && <><ChefHat className="w-3 h-3" /> Preparar</>}
                        {order.status === 'preparing' && <><Package className="w-3 h-3" /> Listo</>}
                        {order.status === 'ready' && <><CheckCircle className="w-3 h-3" /> Entregar</>}
                    </button>
                )}

                {order.status === 'pending' && (
                    <button
                        onClick={() => onStatusChange(order.id, 'cancelled')}
                        className="p-2 border border-gray-200 text-gray-400 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors"
                        title="Cancelar Orden"
                    >
                        <XCircle className="w-4 h-4" />
                    </button>
                )}
            </div>
        </div>
    );
};
