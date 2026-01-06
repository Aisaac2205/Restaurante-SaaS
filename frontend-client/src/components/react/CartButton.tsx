import React from 'react';
import { useStore } from '@nanostores/react';
import { $cartCount, $cartTotal } from '@/store/cartStore';
import { toggleCart } from '@/store/uiStore';
import { ShoppingBag } from 'lucide-react';
import { formatCurrency } from '@/utils/currency';

export const CartButton = () => {
    const [mounted, setMounted] = React.useState(false);
    const count = useStore($cartCount);
    const total = useStore($cartTotal);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || count === 0) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
            <button
                onClick={() => toggleCart()}
                className="bg-primary text-white shadow-lg rounded-full px-6 py-3 flex items-center gap-4 hover:opacity-95 transition-transform hover:scale-105 active:scale-95"
            >
                <div className="relative">
                    <ShoppingBag size={24} />
                    <span className="absolute -top-2 -right-2 bg-white text-primary text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-gray-100">
                        {count}
                    </span>
                </div>
                <span className="font-bold text-lg">{formatCurrency(total)}</span>
            </button>
        </div>
    );
};
