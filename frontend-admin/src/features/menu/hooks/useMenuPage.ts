import { useState, useCallback } from 'react';
import { useCategories } from './useCategories';
import { useProducts } from './useProducts';
import { useToast } from '../../../context/ToastContext';
import type { Category, Product } from '../../../services/menu.service';
import type { CategoryFormData, ProductFormData } from '../types';

export type MenuTab = 'categories' | 'products';

export const useMenuPage = () => {
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState<MenuTab>('categories');

    // Use existing hooks
    const {
        categories,
        isLoading: categoriesLoading,
        create: createCategory,
        update: updateCategory,
        remove: deleteCategory
    } = useCategories();

    const {
        products,
        isLoading: productsLoading,
        create: createProduct,
        update: updateProduct,
        remove: deleteProduct,
        uploadImage
    } = useProducts();

    // Category form state
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
    const [isCategorySubmitting, setIsCategorySubmitting] = useState(false);

    // Product form state
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isProductFormOpen, setIsProductFormOpen] = useState(false);
    const [isProductSubmitting, setIsProductSubmitting] = useState(false);

    // Category handlers
    const openCategoryForm = useCallback((category?: Category) => {
        setSelectedCategory(category || null);
        setIsCategoryFormOpen(true);
    }, []);

    const closeCategoryForm = useCallback(() => {
        setSelectedCategory(null);
        setIsCategoryFormOpen(false);
    }, []);

    const handleCategorySubmit = useCallback(async (data: CategoryFormData) => {
        try {
            setIsCategorySubmitting(true);
            if (selectedCategory) {
                await updateCategory(selectedCategory.id, data);
            } else {
                await createCategory(data);
            }
            closeCategoryForm();
            showToast('Categoría guardada correctamente', 'success');
        } catch (error) {
            console.error('Error saving category:', error);
            showToast('Error al guardar la categoría', 'error');
        } finally {
            setIsCategorySubmitting(false);
        }
    }, [selectedCategory, updateCategory, createCategory, closeCategoryForm, showToast]);

    const handleDeleteCategory = useCallback(async (id: number) => {
        if (!confirm('¿Eliminar esta categoría? Los productos asociados también se verán afectados.')) {
            return;
        }
        try {
            await deleteCategory(id);
            showToast('Categoría eliminada', 'success');
        } catch (error) {
            console.error('Error deleting category:', error);
            showToast('Error al eliminar la categoría', 'error');
        }
    }, [deleteCategory, showToast]);

    // Product handlers
    const openProductForm = useCallback((product?: Product) => {
        setSelectedProduct(product || null);
        setIsProductFormOpen(true);
    }, []);

    const closeProductForm = useCallback(() => {
        setSelectedProduct(null);
        setIsProductFormOpen(false);
    }, []);

    const handleProductSubmit = useCallback(async (data: ProductFormData) => {
        try {
            setIsProductSubmitting(true);
            if (selectedProduct) {
                await updateProduct(selectedProduct.id, data);
            } else {
                await createProduct(data);
            }
            closeProductForm();
            showToast('Producto guardado correctamente', 'success');
        } catch (error) {
            console.error('Error saving product:', error);
            showToast('Error al guardar el producto', 'error');
        } finally {
            setIsProductSubmitting(false);
        }
    }, [selectedProduct, updateProduct, createProduct, closeProductForm, showToast]);

    const handleDeleteProduct = useCallback(async (id: number) => {
        if (!confirm('¿Eliminar este producto?')) {
            return;
        }
        try {
            await deleteProduct(id);
            showToast('Producto eliminado', 'success');
        } catch (error) {
            console.error('Error deleting product:', error);
            showToast('Error al eliminar el producto', 'error');
        }
    }, [deleteProduct, showToast]);

    // Helper to open the correct form based on active tab
    const openActiveForm = useCallback(() => {
        if (activeTab === 'categories') {
            openCategoryForm();
        } else {
            openProductForm();
        }
    }, [activeTab, openCategoryForm, openProductForm]);

    return {
        // Tab state
        activeTab,
        setActiveTab,

        // Data
        categories,
        products,
        categoriesLoading,
        productsLoading,

        // Category form
        categoryForm: {
            selected: selectedCategory,
            isOpen: isCategoryFormOpen,
            isSubmitting: isCategorySubmitting,
            open: openCategoryForm,
            close: closeCategoryForm,
            submit: handleCategorySubmit,
            delete: handleDeleteCategory
        },

        // Product form
        productForm: {
            selected: selectedProduct,
            isOpen: isProductFormOpen,
            isSubmitting: isProductSubmitting,
            open: openProductForm,
            close: closeProductForm,
            submit: handleProductSubmit,
            delete: handleDeleteProduct,
            uploadImage
        },

        // Actions
        openActiveForm
    };
};
