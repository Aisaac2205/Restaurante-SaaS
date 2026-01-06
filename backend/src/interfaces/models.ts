// Interfaces de Base de Datos (Reflejan las tablas SQL)

export interface IRestaurant {
    id: number;
    name: string;
    slug: string;
    email: string;
    password: string; // Hashed
    primary_color: string;
    theme_mode: string; // 'v1-urban' | 'v2-elegant'
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
    services_data: any; // JSONB
    instagram_username: string | null;
    instagram_images: string[]; // JSONB array of strings
    whatsapp_number: string | null;
    enable_pickup: boolean;
    enable_delivery: boolean;
    features_config?: any; // JSONB
    created_at: Date;
    updated_at: Date;
}

export interface IAuthPayload {
    userId: string;
    role: string;
    system_role?: string; // 'SUPER_ADMIN' | 'USER'
    id: number;
    slug: string;
    email: string;
}

export interface ILoginResponse {
    token: string;
    user: {
        id: string;
        email: string;
        full_name: string;
        system_role: string;
    };
    restaurant: {
        id: number;
        name: string;
        slug: string;
        email: string;
        role: string; // Role in this restaurant
    }
}

export interface ICategory {
    id: number;
    restaurant_id: number;
    name: string;
    sort_order: number;
    created_at: Date;
}

export interface IProduct {
    id: number;
    restaurant_id: number;
    category_id: number;
    name: string;
    description: string | null;
    price: string; // Postgres DECIMAL viaja como string en JS para mantener precisión, o number si se parsea
    image_url: string | null;
    is_available: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface IOrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: number;
    subtotal: number;
    product_name?: string; // Optional for display if joined
}

export interface IOrder {
    id: number;
    restaurant_id: number;
    customer_name: string;
    // table_number?: string; // Removed in favor of delivery model
    total: number;
    status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
    payment_method: 'cash' | 'card';
    delivery_method: 'pickup' | 'delivery'; // Added
    delivery_address?: string; // Added
    items?: IOrderItem[];
    created_at: Date;
    updated_at: Date;
}

// Interfaces de Respuesta (DTOs para el Frontend)

export interface IProductResponse {
    id: number;
    name: string;
    description: string | null;
    price: number; // Convertido a number para el frontend
    image_url: string | null;
}

export interface ICategoryResponse {
    id: number;
    name: string;
    products: IProductResponse[];
}

export interface IPublicMenu {
    restaurant: {
        id: number;
        name: string;
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
        email: string; // Expose contact email
        enable_pickup: boolean;
        enable_delivery: boolean;
        features_config?: Record<string, boolean>;
        theme_mode: string;
    };
    categories: ICategoryResponse[];
}
