import { motion } from 'framer-motion';
import type { CategoryTabsProps } from './types';

/**
 * Category filter tabs component
 * Follows SRP: Only handles category tab rendering and selection UI
 */
export function CategoryTabs({
    categories,
    activeCategory,
    onCategoryChange,
}: CategoryTabsProps) {
    // Create tabs array with "TODOS" as first option
    const tabs = ['TODOS', ...categories.map((cat) => cat.name.toUpperCase())];

    return (
        <nav className="flex justify-center gap-3 md:gap-4 flex-wrap mb-16">
            {tabs.map((tab) => {
                const isActive = activeCategory === tab;

                return (
                    <motion.button
                        key={tab}
                        onClick={() => onCategoryChange(tab)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                            px-6 py-3 text-xs md:text-sm uppercase tracking-wider font-medium transition-all duration-300
                            ${isActive
                                ? 'bg-black text-white'
                                : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-500'
                            }
                        `}
                    >
                        {tab}
                    </motion.button>
                );
            })}
        </nav>
    );
}
