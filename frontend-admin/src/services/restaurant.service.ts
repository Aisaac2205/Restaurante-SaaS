import api from '../api/axios';

// Basic interface for JSON Service item
export interface ServiceItem {
    title: string;
    description: string;
    image_url: string;
}

// Interfaces (Partial redundancy but safer for frontend isolation + added fields if not in backend types yet)
export interface RestaurantSettings {
    id: number;
    name: string;
    slug: string;
    email: string;
    primary_color: string;
    theme_mode: string;
    logo_url: string | null;
    hero_image_url: string | null;
    hero_title: string | null;
    hero_subtitle: string | null;
    content_section_image: string | null;
    content_section_title: string | null;
    content_section_body: string | null;
    video_section_title: string | null;
    video_section_subtitle: string | null;
    video_poster_url: string | null;
    video_url: string | null;
    services_data: ServiceItem[];
    instagram_username: string | null;
    instagram_images: string[];
    whatsapp_number: string | null;
    enable_pickup: boolean;
    enable_delivery: boolean;
    features_config?: Record<string, boolean>;
}

export const RestaurantService = {
    getMe: async (): Promise<RestaurantSettings> => {
        const response = await api.get<RestaurantSettings>('/restaurant/me');
        return response.data;
    },

    updateSettings: async (data: Partial<RestaurantSettings>): Promise<RestaurantSettings> => {
        const response = await api.put<RestaurantSettings>('/restaurant/me', data);
        return response.data;
    },

    // Admin Methods
    getAll: async (): Promise<{ id: number; name: string; slug: string; email: string }[]> => {
        const response = await api.get('/restaurant'); // root of restaurant router
        return response.data;
    },

    getById: async (id: number): Promise<RestaurantSettings> => {
        const response = await api.get<RestaurantSettings>(`/restaurant/${id}`);
        return response.data;
    },

    updateById: async (id: number, data: Partial<RestaurantSettings>): Promise<RestaurantSettings> => {
        const response = await api.put<RestaurantSettings>(`/restaurant/${id}`, data);
        return response.data;
    },

    createTenant: async (data: { name: string; slug: string; email: string; password: string }): Promise<void> => {
        await api.post('/restaurant', data);
    }
};
