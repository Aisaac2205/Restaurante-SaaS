import { useState, useCallback, useMemo } from 'react';
import type { Category, Product } from '@/types';

interface UseMenuLogicParams {
    readonly categories: Category[];
    readonly allProducts: Product[];
}

interface UseMenuLogicReturn {
    readonly activeCategory: string;
    readonly filteredProducts: Product[];
    readonly handleCategoryChange: (categoryName: string) => void;
}

/**
 * Custom hook that encapsulates all menu page business logic
 * Follows SRP: Only handles menu filtering logic
 */
export function useMenuLogic({ categories, allProducts }: UseMenuLogicParams): UseMenuLogicReturn {
    const [activeCategory, setActiveCategory] = useState<string>('TODOS');

    // Filter products based on active category
    const filteredProducts = useMemo(() => {
        if (activeCategory === 'TODOS') {
            return allProducts;
        }

        const category = categories.find(
            (cat) => cat.name.toUpperCase() === activeCategory
        );

        return category?.products ?? [];
    }, [activeCategory, categories, allProducts]);

    const handleCategoryChange = useCallback((categoryName: string) => {
        setActiveCategory(categoryName);
    }, []);

    return {
        activeCategory,
        filteredProducts,
        handleCategoryChange,
    };
}
