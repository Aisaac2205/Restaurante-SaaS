import { z } from 'zod';

export const restaurantSettingsSchema = z.object({
    // General
    name: z.string().min(1, "El nombre es requerido"),
    whatsapp_number: z.string().optional(),
    enable_pickup: z.boolean().default(true),
    enable_delivery: z.boolean().default(false),

    // Branding
    primary_color: z.string().regex(/^#/, "Debe ser un color válido"),
    logo_url: z.string().url().optional().or(z.literal('')),
    theme_mode: z.string().default('v1-urban'),

    // Menu Mode
    menu_mode: z.enum(['INTERACTIVE', 'PDF']).default('INTERACTIVE'),
    menu_pdf_url: z.string().url().optional().or(z.literal('')),

    // Landing Hero
    hero_image_url: z.string().url().optional().or(z.literal('')),
    hero_title: z.string().optional(),
    hero_subtitle: z.string().optional(),

    // Landing Content
    content_section_image: z.string().url().optional().or(z.literal('')),
    content_section_title: z.string().optional(),
    content_section_body: z.string().optional(),
    content_section_2_image: z.string().url().optional().or(z.literal('')),
    content_section_2_title: z.string().optional(),
    content_section_2_body: z.string().optional(),

    // Video Section
    video_section_title: z.string().optional(),
    video_section_subtitle: z.string().optional(),
    video_url: z.string().optional(),
    video_poster_url: z.string().optional(),

    // Services (Legacy JSON string replaced by Array)
    services_data: z.array(z.object({
        title: z.string(),
        description: z.string(),
        image_url: z.string()
    })).optional(),

    // Instagram
    instagram_username: z.string().optional(),
    instagram_images_text: z.string().optional(), // Newline separated

    // SaaS Configuration
    features_config: z.record(z.string(), z.boolean()).optional(),
});

import { type UseFormReturn } from 'react-hook-form';

export type RestaurantSettingsForm = z.infer<typeof restaurantSettingsSchema>;
export type RestaurantSettingsInput = z.input<typeof restaurantSettingsSchema>;
export type RestaurantFormType = UseFormReturn<RestaurantSettingsInput, undefined, RestaurantSettingsForm>;
