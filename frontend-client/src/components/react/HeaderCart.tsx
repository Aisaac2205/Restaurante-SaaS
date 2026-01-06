import { useStore } from '@nanostores/react';
import { ShoppingBag } from 'lucide-react';
import { $cartItems } from '@/store/cartStore';
import { setIsCartOpen } from '@/store/uiStore';
import { useEffect, useState } from 'react';

export const HeaderCart = () => {
    const items = useStore($cartItems);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const count = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-800 hover:text-black hover:bg-gray-100 rounded-full transition-all group lg:mr-4"
            aria-label="Ver carrito"
        >
            <ShoppingBag className="w-6 h-6 group-hover:scale-105 transition-transform" />

            {mounted && count > 0 && (
                <span className="absolute top-0 right-0 bg-black text-white text-[10px] font-bold h-5 min-w-[20px] px-1 flex items-center justify-center rounded-full border-2 border-white transform translate-x-1 -translate-y-1 shadow-sm">
                    {count}
                </span>
            )}
        </button>
    );
};
