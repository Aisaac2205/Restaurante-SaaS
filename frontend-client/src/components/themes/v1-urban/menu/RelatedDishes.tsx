import { motion } from 'framer-motion';
import { useRef } from 'react';
import type { RelatedDishesProps } from './types';
import type { Product } from '@/types';
import { MenuCard } from './MenuCard';

/**
 * Formats price in USD format
 */
import { formatCurrency } from '@/utils/currency';

/**
 * Related dishes section component
 * Follows SRP: Only handles rendering of related product cards
 */
export function RelatedDishes({ products, onProductClick }: RelatedDishesProps) {
    if (products.length === 0) return null;

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <h2 className="font-serif text-3xl font-bold text-gray-900">
                        Platillos relacionados
                    </h2>
                    <a
                        href="/menu"
                        className="border border-gray-900 px-6 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-gray-900 hover:text-white transition-all"
                    >
                        Ver Menú Completo
                    </a>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                    {products.map((product, index) => (
                        <motion.article
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white group"
                        >
                            <a href={`/product/${product.id}`} className="block cursor-pointer">
                                {/* Image */}
                                <div className="h-56 overflow-hidden bg-gray-100">
                                    {product.image_url ? (
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            Sin Foto
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="p-6 text-center">
                                    <span className="text-gray-600 text-sm">
                                        {formatCurrency(product.price)}
                                    </span>
                                    <h3 className="font-serif font-bold text-lg text-gray-900 mt-1 mb-2">
                                        {product.name}
                                    </h3>
                                    {product.description && (
                                        <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                                            {product.description}
                                        </p>
                                    )}
                                    <div className="w-12 h-0.5 bg-gray-300 mx-auto" />
                                </div>
                            </a>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
