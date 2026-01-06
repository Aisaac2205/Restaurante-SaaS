import api from '../api/axios';

// =====================
// Types
// =====================

export interface Category {
    id: number;
    restaurant_id: number;
    name: string;
    sort_order: number;
    created_at: string;
}

export interface Product {
    id: number;
    restaurant_id: number;
    category_id: number;
    name: string;
    description: string | null;
    price: number;
    image_url: string | null;
    is_available: boolean;
    created_at: string;
    updated_at: string;
}

export interface CreateCategoryDto {
    name: string;
}

export interface UpdateCategoryDto {
    name?: string;
    sort_order?: number;
}

export interface CreateProductDto {
    category_id: number;
    name: string;
    description?: string | null;
    price: number;
    image_url?: string | null;
}

export interface UpdateProductDto {
    category_id?: number;
    name?: string;
    description?: string | null;
    price?: number;
    image_url?: string | null;
    is_available?: boolean;
}

// =====================
// Service
// =====================

export const MenuService = {
    // Categories
    getCategories: async (): Promise<Category[]> => {
        const response = await api.get<Category[]>('/categories');
        return response.data;
    },

    createCategory: async (data: CreateCategoryDto): Promise<Category> => {
        const response = await api.post<Category>('/categories', data);
        return response.data;
    },

    updateCategory: async (id: number, data: UpdateCategoryDto): Promise<Category> => {
        const response = await api.put<Category>(`/categories/${id}`, data);
        return response.data;
    },

    deleteCategory: async (id: number): Promise<void> => {
        await api.delete(`/categories/${id}`);
    },

    // Products
    getProducts: async (): Promise<Product[]> => {
        const response = await api.get<Product[]>('/products');
        return response.data;
    },

    createProduct: async (data: CreateProductDto): Promise<Product> => {
        const response = await api.post<Product>('/products', data);
        return response.data;
    },

    updateProduct: async (id: number, data: UpdateProductDto): Promise<Product> => {
        const response = await api.put<Product>(`/products/${id}`, data);
        return response.data;
    },

    deleteProduct: async (id: number): Promise<void> => {
        await api.delete(`/products/${id}`);
    },

    // Image upload
    uploadProductImage: async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('image', file);

        const res = await api.post<{ url: string }>('/files/restaurant', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return res.data.url;
    }
};
