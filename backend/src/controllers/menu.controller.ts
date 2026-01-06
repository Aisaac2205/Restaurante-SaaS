import { Request, Response } from 'express';
import { MenuService } from '../services/menu.service';

export class MenuController {
    private menuService: MenuService;

    constructor() {
        this.menuService = new MenuService();
    }

    /**
     * Endpoint: GET /api/menu/:slug
     */
    getMenu = async (req: Request, res: Response): Promise<void> => {
        try {
            const { slug } = req.params;
            console.log(`[MenuController] Fetching menu for slug: "${slug}"`);

            if (!slug) {
                res.status(400).json({ error: 'Slug is required' });
                return;
            }

            const menu = await this.menuService.getPublicMenu(slug);
            res.json(menu);

        } catch (error: unknown) {
            // Manejo de errores básico
            console.error('Error in getMenu:', error);

            let errorMessage = 'Internal Server Error';
            if (error instanceof Error) {
                if (error.message === 'RestaurantNotFound') {
                    res.status(404).json({ error: 'Restaurant not found' });
                    return;
                }
                errorMessage = error.message;
            }

            res.status(500).json({ error: errorMessage });
        }
    }
}
