import { Loader2 } from 'lucide-react';
import type { ProductListProps } from '../types';
import { ProductCard } from './ProductCard';

/**
 * Products grid component
 * Follows SRP: Only handles rendering product grid layout
 */
export function ProductsList({
    products,
    categories,
    isLoading,
    onEdit,
    onDelete,
}: ProductListProps) {
    // Create category name map for quick lookup
    const categoryMap = categories.reduce<Record<number, string>>((acc, cat) => {
        acc[cat.id] = cat.name;
        return acc;
    }, {});

    if (isLoading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-gray-400 w-8 h-8" />
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <p className="text-gray-500">No hay productos creados</p>
                <p className="text-gray-400 text-sm mt-1">
                    Crea tu primer producto para mostrarlo en el menú
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    categoryName={categoryMap[product.category_id] || 'Sin categoría'}
                    onEdit={() => onEdit(product)}
                    onDelete={() => onDelete(product.id)}
                />
            ))}
        </div>
    );
}
