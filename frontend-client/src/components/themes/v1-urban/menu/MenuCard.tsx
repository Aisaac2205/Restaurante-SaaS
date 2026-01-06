import { motion } from 'framer-motion';
import type { Product } from '@/types';
import { formatCurrency } from '@/utils/currency';
import { AddToCartButton } from '@/components/react/AddToCartButton';

/**
 * Formats price in USD format
 */

/**
 * Menu card component for product grid
 * Follows SRP: Only handles individual product card rendering
 */
export function MenuCard({ product, slug }: { product: Product; slug?: string }) {
    const productLink = slug ? `/${slug}/product/${product.id}` : `/product/${product.id}`;
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="group h-full"
        >
            <a href={productLink} data-astro-prefetch className="flex flex-col cursor-pointer block h-full">
                {/* Product Image - Large */}
                <div className="w-full aspect-square md:aspect-[4/3] overflow-hidden bg-gray-100 mb-6">
                    {product.image_url ? (
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <svg
                                className="w-12 h-12"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Product Info - Centered */}
                <div className="flex flex-col items-center text-center px-2">
                    {/* Price above name */}
                    <span className="text-gray-500 text-xs md:text-sm mb-2 tracking-wide">
                        {formatCurrency(product.price)}
                    </span>

                    {/* Product Name */}
                    <h3 className="font-serif font-medium text-base md:text-xl text-gray-900 mb-3 group-hover:text-gray-600 transition-colors leading-tight">
                        {product.name}
                    </h3>

                    {/* Description */}
                    {product.description && (
                        <p className="text-gray-500 text-xs md:text-sm line-clamp-2 mb-4 max-w-xs leading-relaxed">
                            {product.description}
                        </p>
                    )}

                    {/* Decorative Line */}
                    <div className="w-8 h-0.5 bg-gray-300 mt-2"></div>
                </div>
            </a>
        </motion.article>
    );
}
