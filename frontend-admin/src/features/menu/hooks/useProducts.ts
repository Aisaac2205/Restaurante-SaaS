import { useState, useEffect, useCallback } from 'react';
import { MenuService, type Product, type CreateProductDto, type UpdateProductDto } from '../../../services/menu.service';

interface UseProductsReturn {
    readonly products: Product[];
    readonly isLoading: boolean;
    readonly error: string | null;
    readonly create: (data: CreateProductDto) => Promise<Product>;
    readonly update: (id: number, data: UpdateProductDto) => Promise<Product>;
    readonly remove: (id: number) => Promise<void>;
    readonly refresh: () => Promise<void>;
    readonly uploadImage: (file: File) => Promise<string>;
}

/**
 * Hook for managing products CRUD operations
 * Follows SRP: Only handles product state and API communication
 */
export function useProducts(): UseProductsReturn {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await MenuService.getProducts();
            setProducts(data);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Error al cargar los productos');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const create = useCallback(async (data: CreateProductDto): Promise<Product> => {
        const newProduct = await MenuService.createProduct(data);
        setProducts(prev => [...prev, newProduct]);
        return newProduct;
    }, []);

    const update = useCallback(async (id: number, data: UpdateProductDto): Promise<Product> => {
        const updatedProduct = await MenuService.updateProduct(id, data);
        setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
        return updatedProduct;
    }, []);

    const remove = useCallback(async (id: number): Promise<void> => {
        await MenuService.deleteProduct(id);
        setProducts(prev => prev.filter(p => p.id !== id));
    }, []);

    const uploadImage = useCallback(async (file: File): Promise<string> => {
        return await MenuService.uploadProductImage(file);
    }, []);

    return {
        products,
        isLoading,
        error,
        create,
        update,
        remove,
        refresh: fetchProducts,
        uploadImage
    };
}
