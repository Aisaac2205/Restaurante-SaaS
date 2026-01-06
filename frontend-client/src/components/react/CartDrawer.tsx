import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { $isCartOpen, setIsCartOpen } from '@/store/uiStore';
import { $cartItems, $cartTotal, removeFromCart, updateQuantity, clearCart, initializeCart } from '@/store/cartStore';
import { formatCurrency } from '@/utils/currency';
import { generateWhatsAppLink } from '@/utils/whatsapp';
import { X, Trash2, Plus, Minus, MessageCircle, MapPin, Store, User, Phone } from 'lucide-react';

interface Props {
    restaurantPhone: string | null;
    restaurantName: string;
    enablePickup?: boolean;
    enableDelivery?: boolean;
    restaurantId?: number;
    restaurantSlug?: string;
}

export const CartDrawer: React.FC<Props> = ({
    restaurantPhone = '',
    restaurantName,
    enablePickup = true,
    enableDelivery = false,
    restaurantId,
    restaurantSlug = ''
}) => {
    const isOpen = useStore($isCartOpen);
    const items = useStore($cartItems);
    const total = useStore($cartTotal);

    const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');

    // Form States
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    // Initialize cart for this restaurant (multi-tenant isolation)
    useEffect(() => {
        if (restaurantSlug) {
            initializeCart(restaurantSlug);
        }
    }, [restaurantSlug]);

    // Initialize delivery method
    useEffect(() => {
        if (!enablePickup && enableDelivery) {
            setDeliveryMethod('delivery');
        } else if (enablePickup && !enableDelivery) {
            setDeliveryMethod('pickup');
        }
    }, [enablePickup, enableDelivery, isOpen]);

    // Prevent body scroll when cart is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const validateForm = () => {
        const newErrors: Record<string, boolean> = {};
        if (!firstName.trim()) newErrors.firstName = true;
        if (!lastName.trim()) newErrors.lastName = true;
        if (!phone.trim()) newErrors.phone = true;
        if (deliveryMethod === 'delivery' && !address.trim()) newErrors.address = true;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = async () => {
        if (!validateForm()) return;
        if (!restaurantId) {
            alert('Error: No identified restaurant');
            return;
        }

        setIsSubmitting(true);
        try {
            // Import api dynamically to avoid SSR issues if any, though client:only handles it.
            // But we created utils/api.ts which is standard module.
            const { api } = await import('../../utils/api');

            await api.post('/orders', {
                restaurant_id: restaurantId,
                customer_name: `${firstName} ${lastName}`,
                total: total,
                status: 'pending',
                payment_method: 'cash', // Defaulting to cash for now
                delivery_method: deliveryMethod,
                delivery_address: deliveryMethod === 'delivery' ? address : undefined,
                items: items.map(item => ({
                    product_id: item.product.id,
                    quantity: item.quantity,
                    price: item.product.price,
                    subtotal: item.product.price * item.quantity
                }))
            });

            // Success - Clear cart immediately
            clearCart();
            setOrderSuccess(true);
            // Reset form fields
            setFirstName('');
            setLastName('');
            setPhone('');
            setAddress('');

        } catch (error) {
            console.error('Order failed:', error);
            alert('Hubo un error al procesar el pedido. Intenta de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className="fixed inset-0 z-[200] flex justify-end text-black">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>
                <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col items-center justify-center p-8 text-center animate-slide-in-right">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                        <MessageCircle size={32} />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">¡Pedido Recibido!</h2>
                    <p className="text-gray-600 mb-6">Tu orden ha sido enviada a la cocina. Te avisaremos cuando esté lista.</p>
                    <button onClick={() => { setIsCartOpen(false); setOrderSuccess(false); }} className="bg-black text-white px-6 py-3 rounded-xl font-bold">
                        Cerrar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[200] flex justify-end text-black">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={() => setIsCartOpen(false)}
            ></div>

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
                {/* Header */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white z-10">
                    <h2 className="text-xl font-serif font-bold text-gray-900">Tu Pedido</h2>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-500"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content Container */}
                <div className="flex-1 overflow-y-auto">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4 p-8">
                            <ShoppingBagIcon className="w-16 h-16 opacity-20" />
                            <p>Tu carrito está vacío</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="text-primary font-medium hover:underline"
                            >
                                Volver al menú
                            </button>
                        </div>
                    ) : (
                        <div className="p-4 space-y-6">
                            {/* Items List */}
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.product.id} className="flex gap-4">
                                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                            {item.product.image_url ? (
                                                <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs text-gray-400">Sin foto</div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-medium text-gray-900 leading-tight line-clamp-2">{item.product.name}</h3>
                                                <p className="font-bold text-sm text-gray-900 whitespace-nowrap ml-2">{formatCurrency(item.product.price * item.quantity)}</p>
                                            </div>
                                            {item.instructions && (
                                                <p className="text-xs text-gray-500 mb-2 italic">"{item.instructions}"</p>
                                            )}
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-1 border border-gray-100">
                                                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 hover:bg-white rounded-md shadow-sm text-gray-600 disabled:opacity-50 transition-all"><Minus size={14} /></button>
                                                    <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 hover:bg-white rounded-md shadow-sm text-gray-600 transition-all"><Plus size={14} /></button>
                                                </div>
                                                <button onClick={() => removeFromCart(item.product.id)} className="text-gray-400 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-full transition-colors"><Trash2 size={16} /></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100"></div>

                            {/* Checkout Data */}
                            <div className="space-y-5">
                                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                    <User size={18} />
                                    Datos del Cliente
                                </h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase">Nombre <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            value={firstName}
                                            onChange={(e) => { setFirstName(e.target.value); delete errors.firstName; }}
                                            className={`w-full px-3 py-2.5 bg-gray-50 border rounded-lg text-sm focus:ring-2 focus:ring-black outline-none transition-all touch-manipulation ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                                            placeholder="Juan"
                                            inputMode="text"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase">Apellido <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            value={lastName}
                                            onChange={(e) => { setLastName(e.target.value); delete errors.lastName; }}
                                            className={`w-full px-3 py-2.5 bg-gray-50 border rounded-lg text-sm focus:ring-2 focus:ring-black outline-none transition-all touch-manipulation ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                                            placeholder="Pérez"
                                            inputMode="text"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase">Teléfono <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => { setPhone(e.target.value); delete errors.phone; }}
                                            className={`w-full pl-9 pr-3 py-2.5 bg-gray-50 border rounded-lg text-sm focus:ring-2 focus:ring-black outline-none transition-all touch-manipulation ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                                            placeholder="5555-5555"
                                            inputMode="tel"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-100"></div>

                            {/* Delivery Options */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                    {deliveryMethod === 'delivery' ? <MapPin size={18} /> : <Store size={18} />}
                                    Método de Entrega
                                </h3>

                                {(enablePickup && enableDelivery) && (
                                    <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-xl">
                                        <button
                                            onClick={() => setDeliveryMethod('pickup')}
                                            className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${deliveryMethod === 'pickup' ? 'bg-white shadow-sm text-gray-900 ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            <Store size={16} /> Recoger
                                        </button>
                                        <button
                                            onClick={() => setDeliveryMethod('delivery')}
                                            className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${deliveryMethod === 'delivery' ? 'bg-white shadow-sm text-gray-900 ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            <MapPin size={16} /> Domicilio
                                        </button>
                                    </div>
                                )}

                                {deliveryMethod === 'delivery' ? (
                                    <div className="animate-fade-in-up">
                                        <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase">Dirección Exacta <span className="text-red-500">*</span></label>
                                        <textarea
                                            value={address}
                                            onChange={(e) => { setAddress(e.target.value); delete errors.address; }}
                                            placeholder="Detalla zona, colonia, número de casa y referencias..."
                                            rows={3}
                                            className={`w-full p-3 bg-gray-50 border rounded-lg text-sm focus:ring-2 focus:ring-black outline-none transition-all resize-none touch-manipulation ${errors.address ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                                        />
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                                        <Store className="w-5 h-5 flex-shrink-0 text-black mt-0.5" />
                                        <span>Pasarás a recoger tu pedido al restaurante. Te confirmaremos el tiempo de preparación.</span>
                                    </p>
                                )}
                            </div>

                            {/* Validation Msg */}
                            {Object.keys(errors).length > 0 && (
                                <p className="text-red-500 text-sm font-medium text-center animate-pulse">
                                    Por favor completa los campos obligatorios marcados en rojo.
                                </p>
                            )}

                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-4 border-t border-gray-100 bg-gray-50 safe-area-bottom z-10">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600 font-medium">Total a Pagar</span>
                            <span className="text-2xl font-bold text-gray-900">{formatCurrency(total)}</span>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            disabled={isSubmitting}
                            className="w-full bg-[#000000] hover:bg-[#333333] text-white font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>Processing...</>
                            ) : (
                                <>
                                    <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
                                    Confirmar Pedido
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const ShoppingBagIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
);
