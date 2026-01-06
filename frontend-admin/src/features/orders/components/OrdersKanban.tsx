import { OrderCard } from './OrderCard';
import type { Order, OrderStatus } from '../types';
import clsx from 'clsx';

interface Props {
    orders: Order[];
    onUpdateStatus: (id: string, status: OrderStatus) => void;
}

const COLUMNS: { id: OrderStatus; label: string; colorClass: string }[] = [
    { id: 'pending', label: 'Pendientes', colorClass: 'bg-yellow-100/50 border-yellow-200' },
    { id: 'preparing', label: 'En Cocina', colorClass: 'bg-blue-100/50 border-blue-200' },
    { id: 'ready', label: 'Listos', colorClass: 'bg-green-100/50 border-green-200' }
];

export const OrdersKanban = ({ orders, onUpdateStatus }: Props) => {
    return (
        <div className="flex flex-col md:flex-row gap-6 h-full overflow-y-auto md:overflow-x-auto pb-4 md:pb-4 p-1">
            {COLUMNS.map((col) => {
                const columnOrders = orders.filter(o => o.status === col.id);

                return (
                    <div key={col.id} className="w-full md:w-80 flex-shrink-0 flex flex-col h-auto md:h-full rounded-xl bg-gray-50/50 border border-gray-100 mb-4 md:mb-0">
                        {/* Column Header */}
                        <div className={clsx("p-4 border-b flex justify-between items-center rounded-t-xl", col.colorClass)}>
                            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">{col.label}</h3>
                            <span className="bg-white/50 px-2 py-0.5 rounded text-xs font-bold text-gray-700">
                                {columnOrders.length}
                            </span>
                        </div>

                        {/* Drop Zone / List */}
                        <div className="flex-1 p-3 overflow-y-auto space-y-3">
                            {columnOrders.map(order => (
                                <OrderCard
                                    key={order.id}
                                    order={order}
                                    onStatusChange={onUpdateStatus}
                                />
                            ))}

                            {columnOrders.length === 0 && (
                                <div className="h-24 flex items-center justify-center text-gray-300 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                                    Sin ordenes
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
