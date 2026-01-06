import { Pencil, Trash2, GripVertical, Loader2 } from 'lucide-react';
import type { CategoryListProps } from '../types';

/**
 * Category list component with edit/delete actions
 * Follows SRP: Only handles rendering category list UI
 */
export function CategoriesList({
    categories,
    isLoading,
    onEdit,
    onDelete,
}: CategoryListProps) {
    if (isLoading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-gray-400 w-8 h-8" />
            </div>
        );
    }

    if (categories.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <p className="text-gray-500">No hay categorías creadas</p>
                <p className="text-gray-400 text-sm mt-1">Crea tu primera categoría para empezar</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <ul className="divide-y divide-gray-100">
                {categories.map((category) => (
                    <li
                        key={category.id}
                        className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors group"
                    >
                        <div className="flex items-center gap-3">
                            <GripVertical className="w-5 h-5 text-gray-300 cursor-grab" />
                            <span className="font-medium text-gray-900">{category.name}</span>
                            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                                #{category.sort_order}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => onEdit(category)}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Editar"
                            >
                                <Pencil className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => onDelete(category.id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Eliminar"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
