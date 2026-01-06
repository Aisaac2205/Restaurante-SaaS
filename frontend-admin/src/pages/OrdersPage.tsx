import { useState, useEffect, useCallback } from 'react';
import { OrdersKanban } from '../features/orders/components/OrdersKanban';
import type { Order, OrderStatus } from '../features/orders/types';
import { ordersService } from '../services/orders.service';
import { RefreshCw, Plus } from 'lucide-react';
import clsx from 'clsx';
import { OrdersHistory } from '../features/orders/components/OrdersHistory';

import { useToast } from '../context/ToastContext';

export const OrdersPage = () => {
    const [view, setView] = useState<'active' | 'history'>('active');
    const [orders, setOrders] = useState<Order[]>([]);
    const { showToast } = useToast();

    // Fetch orders logic
    const fetchOrders = useCallback(async () => {
        try {
            const data = await ordersService.getOrders(view);
            setOrders(data);
        } catch (error) {
            console.error('Failed to fetch orders', error);
        }
    }, [view]);

    // Effect for fetching and polling
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchOrders();

        // Only poll if viewing active orders
        if (view === 'active') {
            const interval = setInterval(fetchOrders, 10000);
            return () => clearInterval(interval);
        }
    }, [fetchOrders, view]);

    const handleStatusUpdate = async (id: string, newStatus: OrderStatus) => {
        try {
            await ordersService.updateStatus(id, newStatus);
            // Optimistic update
            setOrders(prev => {
                // If status is completed/cancelled, remove it from active view
                if ((newStatus === 'completed' || newStatus === 'cancelled') && view === 'active') {
                    return prev.filter(order => order.id !== id);
                }
                return prev.map(order => order.id === id ? { ...order, status: newStatus } : order);
            });
            showToast('Estado actualizado correctamente', 'success');
        } catch (error) {
            console.error('Failed to update status', error);
            showToast('Error al actualizar el estado', 'error');
            fetchOrders(); // Revert on error
        }
    };

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6 px-1 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Gestor de Pedidos</h1>
                </div>

                <div className="flex flex-wrap gap-3">
                    {/* View Toggles */}
                    <div className="bg-gray-100 p-1 rounded-lg flex">
                        <button
                            onClick={() => setView('active')}
                            className={clsx(
                                "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
                                view === 'active' ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"
                            )}
                        >
                            Activos
                        </button>
                        <button
                            onClick={() => setView('history')}
                            className={clsx(
                                "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
                                view === 'active' ? "text-gray-500 hover:text-gray-700" : "bg-white shadow text-gray-900"
                            )}
                        >
                            Historial
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => fetchOrders()}
                            className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                            title="Actualizar"
                        >
                            <RefreshCw className="w-5 h-5" />
                        </button>
                        {view === 'active' && (
                            <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                                <Plus className="w-4 h-4" />
                                <span className="hidden sm:inline">Nuevo Pedido</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                {view === 'active' ? (
                    <OrdersKanban orders={orders} onUpdateStatus={handleStatusUpdate} />
                ) : (
                    <div className="h-full overflow-y-auto">
                        <div className="max-w-7xl mx-auto">
                            <OrdersHistory orders={orders} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
