import { Plus } from 'lucide-react';
import clsx from 'clsx';
import { useMenuPage, type MenuTab } from '../features/menu/hooks/useMenuPage';
import { CategoriesList } from '../features/menu/components/CategoriesList';
import { CategoryForm } from '../features/menu/components/CategoryForm';
import { ProductsList } from '../features/menu/components/ProductsList';
import { ProductForm } from '../features/menu/components/ProductForm';

const TABS: { id: MenuTab; label: string }[] = [
    { id: 'categories', label: 'Categorías' },
    { id: 'products', label: 'Productos' },
];

export const MenuPage = () => {
    const {
        activeTab,
        setActiveTab,
        categories,
        products,
        categoriesLoading,
        productsLoading,
        categoryForm,
        productForm,
        openActiveForm
    } = useMenuPage();

    const canAddProduct = categories.length > 0;

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    Gestión del Menú
                </h1>
                <button
                    onClick={openActiveForm}
                    disabled={activeTab === 'products' && !canAddProduct}
                    className="bg-black text-white px-5 py-2.5 rounded hover:bg-gray-800 disabled:opacity-50 flex items-center font-medium shadow-sm transition-all active:scale-95"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    {activeTab === 'categories' ? 'Nueva Categoría' : 'Nuevo Producto'}
                </button>
            </div>

            {/* Warning if no categories */}
            {activeTab === 'products' && !canAddProduct && !categoriesLoading && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800 text-sm">
                        Debes crear al menos una categoría antes de agregar productos.
                    </p>
                </div>
            )}

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="border-b border-gray-200">
                    <nav className="flex">
                        {TABS.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={clsx(
                                    "flex-1 py-4 px-6 text-center font-medium transition-colors relative",
                                    activeTab === tab.id
                                        ? "text-black"
                                        : "text-gray-500 hover:text-gray-700"
                                )}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                                )}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="p-6">
                    {activeTab === 'categories' && (
                        <CategoriesList
                            categories={categories}
                            isLoading={categoriesLoading}
                            onEdit={categoryForm.open}
                            onDelete={categoryForm.delete}
                            onReorder={() => { }}
                        />
                    )}

                    {activeTab === 'products' && (
                        <ProductsList
                            products={products}
                            categories={categories}
                            isLoading={productsLoading}
                            onEdit={productForm.open}
                            onDelete={productForm.delete}
                        />
                    )}
                </div>
            </div>

            {/* Category Form Modal */}
            <CategoryForm
                category={categoryForm.selected}
                isOpen={categoryForm.isOpen}
                isSubmitting={categoryForm.isSubmitting}
                onSubmit={categoryForm.submit}
                onClose={categoryForm.close}
            />

            {/* Product Form Modal */}
            <ProductForm
                product={productForm.selected}
                categories={categories}
                isOpen={productForm.isOpen}
                isSubmitting={productForm.isSubmitting}
                onSubmit={productForm.submit}
                onClose={productForm.close}
                onUploadImage={productForm.uploadImage}
            />
        </div>
    );
};
