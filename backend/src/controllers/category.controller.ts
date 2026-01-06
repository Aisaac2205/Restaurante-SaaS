import { Request, Response } from 'express';
import { RestaurantRepository } from '../repositories/restaurant.repository';

export class CategoryController {
    private repo: RestaurantRepository;

    constructor() {
        this.repo = new RestaurantRepository();
    }

    /**
     * GET /api/categories
     * Lista todas las categorías del restaurante autenticado
     */
    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const restaurantId = req.user?.id;
            if (!restaurantId) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            const categories = await this.repo.findCategoriesByRestaurantId(restaurantId);
            res.json(categories);
        } catch (error) {
            console.error('Error in getAll categories:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    /**
     * POST /api/categories
     * Crea una nueva categoría
     */
    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const restaurantId = req.user?.id;
            if (!restaurantId) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            const { name } = req.body;
            if (!name || typeof name !== 'string') {
                res.status(400).json({ error: 'Name is required' });
                return;
            }

            const category = await this.repo.createCategory(restaurantId, name.trim());
            res.status(201).json(category);
        } catch (error) {
            console.error('Error creating category:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    /**
     * PUT /api/categories/:id
     * Actualiza una categoría existente
     */
    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const restaurantId = req.user?.id;
            if (!restaurantId) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            const { id } = req.params;
            const { name, sort_order } = req.body;

            const category = await this.repo.updateCategory(
                parseInt(id, 10),
                restaurantId,
                { name, sort_order }
            );

            if (!category) {
                res.status(404).json({ error: 'Category not found' });
                return;
            }

            res.json(category);
        } catch (error) {
            console.error('Error updating category:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    /**
     * DELETE /api/categories/:id
     * Elimina una categoría
     */
    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const restaurantId = req.user?.id;
            if (!restaurantId) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            const { id } = req.params;
            const deleted = await this.repo.deleteCategory(parseInt(id, 10), restaurantId);

            if (!deleted) {
                res.status(404).json({ error: 'Category not found' });
                return;
            }

            res.status(204).send();
        } catch (error) {
            console.error('Error deleting category:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}
