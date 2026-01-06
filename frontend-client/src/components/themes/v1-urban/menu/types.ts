import type { Category, Product } from '@/types';

/**
 * Props for the main MenuPage component
 */
export interface MenuPageProps {
    readonly categories: Category[];
    readonly allProducts: Product[];
    readonly slug?: string;
}

/**
 * Props for CategoryTabs component
 */
export interface CategoryTabsProps {
    readonly categories: Category[];
    readonly activeCategory: string;
    readonly onCategoryChange: (categoryName: string) => void;
}

/**
 * Props for MenuCard component
 */
/**
 * Props for MenuCard component
 */
export interface MenuCardProps {
    readonly product: Product;
}

/**
 * Props for RelatedDishes component
 */
export interface RelatedDishesProps {
    readonly products: Product[];
    readonly onProductClick?: (product: Product) => void; // Optional for backward/other compat if needed, but we removed usage
}
