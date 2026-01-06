import { Pencil, Trash2, ImageOff } from 'lucide-react';
import type { ProductCardProps } from '../types';

/**
 * Product card component for the grid view
 * Follows SRP: Only handles individual product card rendering
 */
export function ProductCard({ product, categoryName, onEdit, onDelete }: ProductCardProps) {
    const formatPrice = (price: number) => `Q. ${price.toFixed(2)}`;

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow">
            {/* Image */}
            <div className="h-40 bg-gray-100 relative">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ImageOff className="w-12 h-12" />
                    </div>
                )}

                {/* Status badge */}
                {!product.is_available && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">
                        No disponible
                    </span>
                )}

                {/* Actions overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                        onClick={onEdit}
                        className="p-2 bg-white rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                        title="Editar"
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button
                        onClick={onDelete}
                        className="p-2 bg-white rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        title="Eliminar"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="p-4">
                <span className="text-xs text-gray-400 uppercase tracking-wider">
                    {categoryName}
                </span>
                <h3 className="font-semibold text-gray-900 mt-1 line-clamp-1">
                    {product.name}
                </h3>
                {product.description && (
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                        {product.description}
                    </p>
                )}
                <p className="font-bold text-gray-900 mt-2">
                    {formatPrice(product.price)}
                </p>
            </div>
        </div>
    );
}
