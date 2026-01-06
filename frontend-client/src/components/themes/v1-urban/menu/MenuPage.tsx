import { motion } from 'framer-motion';
import type { MenuPageProps } from './types';
import { useMenuLogic } from './useMenuLogic';
import { CategoryTabs } from './CategoryTabs';
import { MenuCard } from './MenuCard';


/**
 * Main Menu Page component
 * Follows SRP: Orchestrates menu components and delegates logic to useMenuLogic hook
 */
export function MenuPage({ categories, allProducts, slug }: MenuPageProps) {
    const {
        activeCategory,
        filteredProducts,
        handleCategoryChange,
    } = useMenuLogic({ categories, allProducts });

    return (
        <section className="min-h-screen bg-white pt-16 pb-20">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="w-12 h-0.5 bg-gray-900 mx-auto mb-8" />
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-serif text-3xl md:text-5xl font-bold text-gray-900 mb-6"
                    >
                        ¡Descubre Nuestros Platillos!
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-500 max-w-xl mx-auto"
                    >
                        Descubre nuestra selección de platillos preparados con los mejores
                        ingredientes y pasión culinaria.
                    </motion.p>
                </div>

                {/* Category Tabs */}
                <CategoryTabs
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={handleCategoryChange}
                />

                {/* Products Grid - 2 cols mobile, 3 cols desktop */}
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-10">
                    {filteredProducts.map((product) => (
                        <MenuCard
                            key={product.id}
                            product={product}
                            slug={slug}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500">
                            No hay productos en esta categoría.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
