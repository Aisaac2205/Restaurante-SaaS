import { RestaurantRepository } from '../repositories/restaurant.repository';
import { IPublicMenu, ICategoryResponse, IProductResponse } from '../interfaces/models';

export class MenuService {
    private restaurantRepo: RestaurantRepository;

    constructor() {
        // Inyección de dependencias manual (podría usarse un contenedor IOC en apps más grandes)
        this.restaurantRepo = new RestaurantRepository();
    }

    /**
     * Obtiene el menú público completo estructurado para un slug dado.
     * Lanza error si no encuentra el restaurante.
     */
    async getPublicMenu(slug: string): Promise<IPublicMenu> {
        // 1. Obtener restaurante
        const restaurant = await this.restaurantRepo.findRestaurantBySlug(slug);

        if (!restaurant) {
            throw new Error('RestaurantNotFound');
        }

        // 2. Obtener categorías y productos en paralelo para eficiencia
        const [categories, products] = await Promise.all([
            this.restaurantRepo.findCategoriesByRestaurantId(restaurant.id),
            this.restaurantRepo.findProductsByRestaurantId(restaurant.id)
        ]);

        // 3. Estructurar la data (Business Logic)
        // Mapeamos productos a un Map o Filter por categoría en memoria

        const categoriesResponse: ICategoryResponse[] = categories.map(category => {
            // Filtramos productos que pertenecen a esta categoría
            const categoryProducts = products.filter(p => p.category_id === category.id);

            const productsMapped: IProductResponse[] = categoryProducts.map(p => ({
                id: p.id,
                name: p.name,
                description: p.description,
                price: parseFloat(p.price), // Convertir string decimal a number
                image_url: p.image_url
            }));

            return {
                id: category.id,
                name: category.name,
                products: productsMapped
            };
        });

        // 4. Construir respuesta final
        const response: IPublicMenu = {
            restaurant: {
                id: restaurant.id,
                name: restaurant.name,
                logo_url: restaurant.logo_url,
                hero_image_url: restaurant.hero_image_url,
                hero_title: restaurant.hero_title,
                hero_subtitle: restaurant.hero_subtitle,
                content_section_image: restaurant.content_section_image,
                content_section_title: restaurant.content_section_title,
                content_section_body: restaurant.content_section_body,
                content_section_2_image: restaurant.content_section_2_image,
                content_section_2_title: restaurant.content_section_2_title,
                content_section_2_body: restaurant.content_section_2_body,
                video_section_title: restaurant.video_section_title,
                video_section_subtitle: restaurant.video_section_subtitle,
                video_poster_url: restaurant.video_poster_url,
                video_url: restaurant.video_url,
                services_data: restaurant.services_data,
                instagram_username: restaurant.instagram_username,
                instagram_images: restaurant.instagram_images,
                primary_color: restaurant.primary_color,
                whatsapp_number: restaurant.whatsapp_number,
                email: restaurant.email,
                enable_pickup: restaurant.enable_pickup,
                enable_delivery: restaurant.enable_delivery,
                features_config: restaurant.features_config,
                theme_mode: restaurant.theme_mode || 'v1-urban',
                menu_mode: restaurant.menu_mode || 'INTERACTIVE',
                menu_pdf_url: restaurant.menu_pdf_url
            },
            categories: categoriesResponse
        };

        return response;
    }
}
