import { Request, Response } from 'express';
import { RestaurantRepository } from '../repositories/restaurant.repository';

interface CreateProductBody {
    category_id: number;
    name: string;
    description?: string | null;
    price: number;
    image_url?: string | null;
}

interface UpdateProductBody {
    category_id?: number;
    name?: string;
    description?: string | null;
    price?: number;
    image_url?: string | null;
    is_available?: boolean;
}

export class ProductController {
    private repo: RestaurantRepository;

    constructor() {
        this.repo = new RestaurantRepository();
    }

    /**
     * GET /api/products
     * Lista todos los productos del restaurante autenticado
     */
    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const restaurantId = req.user?.id;
            if (!restaurantId) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            const products = await this.repo.findAllProductsByRestaurantId(restaurantId);

            // Parse price to number for frontend
            const formattedProducts = products.map(p => ({
                ...p,
                price: parseFloat(p.price)
            }));

            res.json(formattedProducts);
        } catch (error) {
            console.error('Error in getAll products:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    /**
     * POST /api/products
     * Crea un nuevo producto
     */
    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const restaurantId = req.user?.id;
            if (!restaurantId) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            const { category_id, name, description, price, image_url } = req.body as CreateProductBody;

            // Validation
            if (!category_id || !name || price === undefined) {
                res.status(400).json({ error: 'category_id, name, and price are required' });
                return;
            }

            // Verify category belongs to restaurant
            const category = await this.repo.findCategoryById(category_id, restaurantId);
            if (!category) {
                res.status(400).json({ error: 'Invalid category_id' });
                return;
            }

            const product = await this.repo.createProduct(restaurantId, {
                category_id,
                name: name.trim(),
                description: description?.trim() || null,
                price,
                image_url: image_url || null
            });

            res.status(201).json({
                ...product,
                price: parseFloat(product.price)
            });
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    /**
     * PUT /api/products/:id
     * Actualiza un producto existente
     */
    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const restaurantId = req.user?.id;
            if (!restaurantId) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            const { id } = req.params;
            const { category_id, name, description, price, image_url, is_available } = req.body as UpdateProductBody;

            // If changing category, verify it belongs to restaurant
            if (category_id) {
                const category = await this.repo.findCategoryById(category_id, restaurantId);
                if (!category) {
                    res.status(400).json({ error: 'Invalid category_id' });
                    return;
                }
            }

            const product = await this.repo.updateProduct(
                parseInt(id, 10),
                restaurantId,
                { category_id, name, description, price, image_url, is_available }
            );

            if (!product) {
                res.status(404).json({ error: 'Product not found' });
                return;
            }

            res.json({
                ...product,
                price: parseFloat(product.price)
            });
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    /**
     * DELETE /api/products/:id
     * Elimina un producto
     */
    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const restaurantId = req.user?.id;
            if (!restaurantId) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }

            const { id } = req.params;
            const deleted = await this.repo.deleteProduct(parseInt(id, 10), restaurantId);

            if (!deleted) {
                res.status(404).json({ error: 'Product not found' });
                return;
            }

            res.status(204).send();
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}
