import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import type { CategoryFormProps, CategoryFormData } from '../types';

/**
 * Modal form for creating/editing categories
 * Follows SRP: Only handles category form UI and validation
 */
export function CategoryForm({
    category,
    isOpen,
    isSubmitting,
    onSubmit,
    onClose,
}: CategoryFormProps) {
    const [name, setName] = useState(category?.name || '');
    const [error, setError] = useState('');
    const [prevCategory, setPrevCategory] = useState(category);

    // Sync state with props changes (Derived State Pattern)
    if (category !== prevCategory) {
        setPrevCategory(category);
        setName(category?.name || '');
        setError('');
    }

    // Reset when modal opens if needed (handled by key or above sync if category changes)
    // We also watch isOpen to clear if closed? No need if it unmounts or we use prevCategory logic.
    // However, if we reopen with same category (e.g. edit -> close -> edit same), category prop object ref might be same.
    // Ideally parent handles unmount. Assuming category object ref changes or parent handles key.

    const isEditing = Boolean(category);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            setError('El nombre es requerido');
            return;
        }

        const data: CategoryFormData = {
            name: name.trim()
        };

        onSubmit(data);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {isEditing ? 'Editar Categoría' : 'Nueva Categoría'}
                    </h2>
                    <button
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-4">
                        <label
                            htmlFor="category-name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Nombre de la Categoría
                        </label>
                        <input
                            id="category-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ej: Hamburguesas, Bebidas, Postres..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                            autoFocus
                        />
                        {error && (
                            <p className="mt-1 text-sm text-red-600">{error}</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                            {isEditing ? 'Guardar' : 'Crear'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
