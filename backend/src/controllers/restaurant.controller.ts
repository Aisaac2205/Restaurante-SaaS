import { Request, Response } from 'express';
import { RestaurantRepository } from '../repositories/restaurant.repository';

export class RestaurantController {
    private repository: RestaurantRepository;

    constructor() {
        this.repository = new RestaurantRepository();
    }

    getMe = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = req.user;
            if (!user) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            // Reusamos findRestaurantByEmail o creamos uno por ID?
            // Como tenemos ID en el token, mejor buscar por ID directo.
            // Pero el repo actual tiene findBySlug e Email.
            // Usaremos findByEmail ya que lo tenemos en el token (si lo guardamos)
            // O slug.
            const restaurant = await this.repository.findRestaurantByEmail(user.email);
            if (!restaurant) {
                res.status(404).json({ error: 'RestaurantNotFound' });
                return;
            }

            // Ocultamos password
            const { password, ...safeRestaurant } = restaurant;
            res.json(safeRestaurant);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'InternalServer' });
        }
    };

    updateSettings = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = req.user;
            if (!user) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            const {
                name, whatsapp_number, primary_color, logo_url, hero_image_url,
                hero_title, hero_subtitle, content_section_image, content_section_title, content_section_body,
                video_section_title, video_section_subtitle, video_poster_url, video_url,
                services_data, instagram_username, instagram_images, enable_pickup, enable_delivery, features_config, theme_mode
            } = req.body;

            const updated = await this.repository.updateRestaurant(user.id, {
                name, whatsapp_number, primary_color, logo_url, hero_image_url,
                hero_title, hero_subtitle, content_section_image, content_section_title, content_section_body,
                video_section_title, video_section_subtitle, video_poster_url, video_url,
                services_data, instagram_username, instagram_images, enable_pickup, enable_delivery, features_config, theme_mode
            });

            res.json(updated);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'InternalServer' });
        }
    }

    getAllRestaurants = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = req.user;
            if (user?.system_role !== 'SUPER_ADMIN') {
                res.status(403).json({ error: 'Forbidden' });
                return;
            }

            const restaurants = await this.repository.findAll();
            res.json(restaurants);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            res.status(500).json({ error: 'InternalServer' });
        }
    }

    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            if (req.user?.system_role !== 'SUPER_ADMIN') {
                res.status(403).json({ error: 'Forbidden' });
                return;
            }

            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ error: 'Invalid ID' });
                return;
            }

            const restaurant = await this.repository.findById(id);
            if (!restaurant) {
                res.status(404).json({ error: 'NotFound' });
                return;
            }

            // Ocultar password
            const { password, ...safeRestaurant } = restaurant;
            res.json(safeRestaurant);

        } catch (error) {
            console.error('Error fetching restaurant:', error);
            res.status(500).json({ error: 'InternalServer' });
        }
    }

    updateById = async (req: Request, res: Response): Promise<void> => {
        try {
            if (req.user?.system_role !== 'SUPER_ADMIN') {
                res.status(403).json({ error: 'Forbidden' });
                return;
            }

            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ error: 'Invalid ID' });
                return;
            }

            const updated = await this.repository.updateRestaurant(id, req.body);
            res.json(updated);
        } catch (error) {
            console.error('Error updating restaurant:', error);
            res.status(500).json({ error: 'InternalServer' });
        }
    }

    createRestaurant = async (req: Request, res: Response): Promise<void> => {
        try {
            if (req.user?.system_role !== 'SUPER_ADMIN') {
                res.status(403).json({ error: 'Forbidden' });
                return;
            }

            const { name, slug, email, password } = req.body;

            if (!name || !slug || !email || !password) {
                res.status(400).json({ error: 'MissingFields' });
                return;
            }

            // TODO: Validate slug format via regex if needed
            // TODO: Check duplicates logic is handled in Repo (Unique Constraints)
            // But repo logic uses try/catch.

            const result = await this.repository.createTenant({ name, slug, email, password });

            // Ocultar hash en respuesta
            const { password: _, ...safeRestaurant } = result.restaurant;

            res.status(201).json({
                restaurant: safeRestaurant,
                user: result.user
            });

        } catch (error) {
            console.error('Error creating tenant:', error);
            // Detect unique violation
            // if (error.code === '23505') ...
            res.status(500).json({ error: 'InternalServer' });
        }
    }
}
