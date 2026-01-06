import React from "react";
import type { Category } from "@/types";
import { formatCurrency } from "@/utils/currency";

interface MenuProps {
    categories: Category[];
    heroImageUrl?: string | null;
}

export const Menu: React.FC<MenuProps> = ({ categories, heroImageUrl }) => {
    return (
        <section className="relative min-h-screen">
            {/* Fullscreen Hero Background with Overlay */}
            <div className="absolute inset-x-0 top-0 h-[500px] md:h-[600px] z-0 overflow-hidden">
                {heroImageUrl ? (
                    <img
                        src={heroImageUrl}
                        alt="Menu background"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-stone-800"></div>
                )}
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Title Section (Over Hero) */}
            <div className="relative z-10 pt-24 pb-40 md:pt-32 md:pb-48 text-center text-white">
                <div className="w-12 h-0.5 bg-white mx-auto mb-8"></div>
                <h2 className="font-serif text-4xl md:text-6xl italic font-light mb-4">
                    Nuestro Menú
                </h2>
                <p className="text-white/80 max-w-lg mx-auto px-4 font-light text-lg">
                    Descubre nuestra selección de platillos preparados con los mejores ingredientes.
                </p>
            </div>

            {/* White Carta (Menu Sheet) - Overlaps Hero */}
            <div className="relative z-20 mx-4 md:mx-auto max-w-4xl bg-white shadow-2xl -mt-20 md:-mt-28 mb-20">
                <div className="px-8 py-16 md:px-16 md:py-24">
                    <div className="space-y-16 md:space-y-20">
                        {categories.map((category) => (
                            (category.products && category.products.length > 0) && (
                                <div key={category.id} className="menu-category">
                                    <h3 className="font-serif text-2xl md:text-3xl mb-10 pb-4 border-b border-stone-200">
                                        {category.name}
                                    </h3>

                                    <div className="space-y-8">
                                        {category.products.map((product) => (
                                            <div key={product.id} className="group">
                                                <a
                                                    href={`/product/${product.id}`}
                                                    data-astro-prefetch
                                                    className="block group cursor-pointer"
                                                >
                                                    <div className="flex items-baseline justify-between mb-2">
                                                        <h4 className="font-sans text-sm md:text-base uppercase tracking-wide font-medium text-stone-800 group-hover:text-stone-600 transition-colors">
                                                            {product.name}
                                                        </h4>
                                                        <div className="flex-grow mx-4 border-b border-dotted border-stone-300 relative -top-1"></div>
                                                        <span className="font-serif text-base md:text-lg whitespace-nowrap text-stone-700">
                                                            {formatCurrency(product.price)}
                                                        </span>
                                                    </div>
                                                    {product.description && (
                                                        <p className="font-sans text-sm text-stone-500 leading-relaxed max-w-[90%] font-light group-hover:text-stone-700 transition-colors">
                                                            {product.description}
                                                        </p>
                                                    )}
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
