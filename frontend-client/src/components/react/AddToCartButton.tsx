import React, { useState } from 'react';
import type { Product } from '@/types';
import { addToCart } from '@/store/cartStore';
import { Plus, Check } from 'lucide-react';
import { setIsCartOpen } from '@/store/uiStore';

interface Props {
    product: Product;
}

export const AddToCartButton: React.FC<Props> = ({ product }) => {
    const [added, setAdded] = useState(false);

    const handleAdd = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        addToCart(product);
        setAdded(true);

        // Optional: Open cart slightly or just show feedback
        // setIsCartOpen(true); 

        setTimeout(() => setAdded(false), 1500);
    };

    return (
        <button
            onClick={handleAdd}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 shadow-sm
        ${added ? 'bg-green-500 text-white' : 'bg-primary text-white hover:opacity-90'}
`}
            aria-label="Agregar al carrito"
        >
            {added ? <Check size={16} /> : <Plus size={18} />}
        </button>
    );
};
