// Restaurant (from API)
export interface Restaurant {
    id: number;
    name: string;
    slug: string;
    logo_url: string | null;
    hero_image_url: string | null;
    hero_title: string | null;
    hero_subtitle: string | null;
    content_section_image: string | null;
    content_section_title: string | null;
    content_section_body: string | null;
    content_section_2_image: string | null;
    content_section_2_title: string | null;
    content_section_2_body: string | null;
    video_section_title: string | null;
    video_section_subtitle: string | null;
    video_poster_url: string | null;
    video_url: string | null;
    services_data: any;
    instagram_username: string | null;
    instagram_images: string[];
    primary_color: string;
    whatsapp_number: string | null;
    email: string;
    enable_pickup?: boolean;
    enable_delivery?: boolean;
    features_config?: Record<string, boolean>;
    theme_mode?: string;
    menu_mode?: 'INTERACTIVE' | 'PDF';
    menu_pdf_url?: string | null;
}

// Product (from API)
export interface Product {
    id: number;
    name: string;
    description: string | null;
    price: number;
    original_price?: number | null;
    image_url: string | null;
    tags?: string[];
}

// Category with nested products (from API)
export interface Category {
    id: number;
    name: string;
    products: Product[];
}

// Full API response for /api/menu/:slug
export interface PublicMenu {
    restaurant: Restaurant;
    categories: Category[];
}

// Cart item (local state)
export interface CartItem {
    product: Product;
    quantity: number;
    instructions?: string;
}
