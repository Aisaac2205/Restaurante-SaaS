import { useState, useEffect, useCallback } from 'react';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RestaurantService } from '../../../services/restaurant.service';
import type { RestaurantSettings } from '../../../services/restaurant.service';
import { restaurantSettingsSchema, type RestaurantSettingsForm, type RestaurantSettingsInput } from '../types';
import api from '../../../api/axios';

export interface UseRestaurantFormReturn {
    form: UseFormReturn<RestaurantSettingsInput, undefined, RestaurantSettingsForm>;
    loading: boolean;
    saving: boolean;
    saveSettings: (data: RestaurantSettingsForm) => Promise<boolean>;
    uploadImage: (file: File) => Promise<string>;
    uploadVideo: (file: File) => Promise<string>;
    reload: () => Promise<void>;
}

export const useRestaurantForm = (restaurantId?: number | null): UseRestaurantFormReturn => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const form = useForm<RestaurantSettingsInput, undefined, RestaurantSettingsForm>({
        resolver: zodResolver(restaurantSettingsSchema),
    });

    const { reset } = form;

    const loadData = useCallback(async () => {
        // If explicitly null, it means "waiting for selection" or "no tenant selected yet" in Admin Mode
        // We shouldn't fetch anything.
        if (restaurantId === null) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const data: RestaurantSettings = (restaurantId !== undefined)
                ? await RestaurantService.getById(restaurantId) // Admin Mode (Specific ID)
                : await RestaurantService.getMe();              // Owner Mode (Current User)

            reset({
                name: data.name,
                whatsapp_number: data.whatsapp_number || '',
                primary_color: data.primary_color || '#000000',
                theme_mode: data.theme_mode || 'v1-urban',
                logo_url: data.logo_url || '',

                hero_image_url: data.hero_image_url || '',
                hero_title: data.hero_title || '',
                hero_subtitle: data.hero_subtitle || '',

                content_section_image: data.content_section_image || '',
                content_section_title: data.content_section_title || '',
                content_section_body: data.content_section_body || '',

                video_section_title: data.video_section_title || '',
                video_section_subtitle: data.video_section_subtitle || '',
                video_url: data.video_url || '',
                video_poster_url: data.video_poster_url || '',

                services_data: data.services_data || [],

                instagram_username: data.instagram_username || '',
                instagram_images_text: (data.instagram_images || []).join('\n'),
                enable_pickup: data.enable_pickup ?? true,
                enable_delivery: data.enable_delivery ?? false,
                features_config: data.features_config || {}
            });
        } catch (error) {
            console.error('Error loading restaurant data:', error);
        } finally {
            setLoading(false);
        }
    }, [reset, restaurantId]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const saveSettings = async (data: RestaurantSettingsForm) => {
        setSaving(true);
        try {
            const instagram_images = data.instagram_images_text
                ? data.instagram_images_text.split('\n').map(l => l.trim()).filter(Boolean)
                : [];

            const payload = {
                ...data,
                services_data: data.services_data || [],
                instagram_images
            };

            if (restaurantId) {
                await RestaurantService.updateById(restaurantId, payload);
            } else {
                await RestaurantService.updateSettings(payload);
            }

            return true; // Success
        } catch (error) {
            console.error('Error saving settings:', error);
            throw error;
        } finally {
            setSaving(false);
        }
    };

    const uploadImage = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('image', file);

        const res = await api.post<{ url: string }>('/files/restaurant', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return res.data.url;
    };

    const uploadVideo = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('video', file);

        const res = await api.post<{ url: string }>('/files/video', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return res.data.url;
    };

    return {
        form,
        loading,
        saving,
        saveSettings,
        uploadImage,
        uploadVideo,
        reload: loadData
    };
};
