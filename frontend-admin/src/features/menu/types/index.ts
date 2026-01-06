import type { Category, Product } from '../../../services/menu.service';

// =====================
// Category Types
// =====================

export interface CategoryFormData {
    name: string;
}

export interface CategoryListProps {
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly onEdit: (category: Category) => void;
    readonly onDelete: (id: number) => void;
    readonly onReorder: (categories: Category[]) => void;
}

export interface CategoryFormProps {
    readonly category?: Category | null;
    readonly isOpen: boolean;
    readonly isSubmitting: boolean;
    readonly onSubmit: (data: CategoryFormData) => void;
    readonly onClose: () => void;
}

// =====================
// Product Types
// =====================

export interface ProductFormData {
    category_id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
}

export interface ProductListProps {
    readonly products: Product[];
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly onEdit: (product: Product) => void;
    readonly onDelete: (id: number) => void;
}

export interface ProductFormProps {
    readonly product?: Product | null;
    readonly categories: Category[];
    readonly isOpen: boolean;
    readonly isSubmitting: boolean;
    readonly onSubmit: (data: ProductFormData) => void;
    readonly onClose: () => void;
    readonly onUploadImage: (file: File) => Promise<string>;
}

export interface ProductCardProps {
    readonly product: Product;
    readonly categoryName: string;
    readonly onEdit: () => void;
    readonly onDelete: () => void;
}
