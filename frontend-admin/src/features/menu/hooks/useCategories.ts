import { useState, useEffect, useCallback } from 'react';
import { MenuService, type Category, type CreateCategoryDto, type UpdateCategoryDto } from '../../../services/menu.service';

interface UseCategoriesReturn {
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly error: string | null;
    readonly create: (data: CreateCategoryDto) => Promise<Category>;
    readonly update: (id: number, data: UpdateCategoryDto) => Promise<Category>;
    readonly remove: (id: number) => Promise<void>;
    readonly refresh: () => Promise<void>;
}

/**
 * Hook for managing categories CRUD operations
 * Follows SRP: Only handles category state and API communication
 */
export function useCategories(): UseCategoriesReturn {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await MenuService.getCategories();
            setCategories(data);
        } catch (err) {
            console.error('Error fetching categories:', err);
            setError('Error al cargar las categorías');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const create = useCallback(async (data: CreateCategoryDto): Promise<Category> => {
        const newCategory = await MenuService.createCategory(data);
        setCategories(prev => [...prev, newCategory]);
        return newCategory;
    }, []);

    const update = useCallback(async (id: number, data: UpdateCategoryDto): Promise<Category> => {
        const updatedCategory = await MenuService.updateCategory(id, data);
        setCategories(prev => prev.map(c => c.id === id ? updatedCategory : c));
        return updatedCategory;
    }, []);

    const remove = useCallback(async (id: number): Promise<void> => {
        await MenuService.deleteCategory(id);
        setCategories(prev => prev.filter(c => c.id !== id));
    }, []);

    return {
        categories,
        isLoading,
        error,
        create,
        update,
        remove,
        refresh: fetchCategories
    };
}
