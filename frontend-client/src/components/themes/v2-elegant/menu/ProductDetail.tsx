import { formatCurrency } from '@/utils/currency';
import { addToCart } from '@/store/cartStore';
import type { Product } from '@/types';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

/**
 * Tag icon mapping for dish categories
 */
const TAG_ICONS: Record<string, string> = {
    vegetarian: '🥬',
    spicy: '🌶️',
    'gluten-free': '🌾',
    vegan: '🌱',
};

interface ProductDetailProps {
    product: Product;
}

/**
 * Standalone Product Detail Component
 */
export function ProductDetail({ product }: ProductDetailProps) {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setQuantity(1);
    };

    return (
        <div className="bg-white min-h-[60vh]">
            <div className="container mx-auto px-4 py-8 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    {/* Left Column: Image */}
                    <div className="w-full relative">
                        <div className="aspect-square w-full bg-gray-100 overflow-hidden relative">
                            {product.image_url ? (
                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Info */}
                    <div className="flex flex-col">
                        {/* Decorative Line */}
                        <div className="w-16 h-1 bg-black mb-8" />

                        <h1 className="font-serif text-3xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                            {product.name}
                        </h1>

                        <p className="text-gray-500 text-base leading-relaxed mb-6">
                            {product.description || "Sin descripción disponible para este platillo."}
                        </p>

                        {/* Price */}
                        <div className="flex items-center gap-4 mb-8">
                            {product.original_price && (
                                <span className="text-gray-400 line-through text-lg font-medium">
                                    {formatCurrency(product.original_price)}
                                </span>
                            )}
                            <span className="text-gray-900 font-bold text-2xl">
                                {formatCurrency(product.price)}
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-row gap-4 mb-12 h-12">
                            {/* Quantity Control */}
                            <div className="flex items-center border border-stone-200 rounded-lg px-2 min-w-[120px] justify-between">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-2 text-stone-500 hover:text-stone-900 transition-colors"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="font-semibold text-lg text-stone-900">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-2 text-stone-500 hover:text-stone-900 transition-colors"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-black text-white rounded-lg text-sm font-bold tracking-widest uppercase hover:bg-stone-800 transition-colors shadow-sm active:scale-[0.98] flex items-center justify-center"
                            >
                                Agregar al Pedido
                            </button>
                        </div>

                        {/* Categories/Tags removed as per request */}
                    </div>
                </div>
            </div>
        </div>
    );
}
