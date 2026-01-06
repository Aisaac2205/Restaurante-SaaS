import { query } from '../config/db';
import { IRestaurant, ICategory, IProduct } from '../interfaces/models';

export class RestaurantRepository {
  /**
   * Busca un restaurante por su slug único.
   */
  async findRestaurantBySlug(slug: string): Promise<IRestaurant | null> {
    // Note: Password usually excluded in public queries, but included here effectively if typed IRestaurant strictly involves it.
    // However for public menu we don't need password.
    // I will adjust the query to only select what is needed for public view if strict, but IRestaurant now has password. 
    // Ideally I would separate DB Model (with password) vs Domain Model.
    // For now, I will select generic fields.
    // For now, I will select generic fields.
    const text = `
      SELECT id, name, slug, email, password, primary_color, theme_mode, menu_mode, menu_pdf_url, logo_url, hero_image_url, hero_title, hero_subtitle, content_section_image, content_section_title, content_section_body, content_section_2_image, content_section_2_title, content_section_2_body, video_section_title, video_section_subtitle, video_poster_url, video_url, services_data, instagram_username, instagram_images, whatsapp_number, enable_pickup, enable_delivery, created_at, updated_at, features_config
      FROM restaurants
      WHERE slug = $1
    `;
    const result = await query<IRestaurant>(text, [slug]);
    return result.length > 0 ? result[0] : null;
  }

  /**
   * Busca un restaurante por su email (para login).
   */
  async findRestaurantByEmail(email: string): Promise<IRestaurant | null> {
    const text = `
      SELECT id, name, slug, email, password, primary_color, theme_mode, menu_mode, menu_pdf_url, logo_url, hero_image_url, hero_title, hero_subtitle, content_section_image, content_section_title, content_section_body, content_section_2_image, content_section_2_title, content_section_2_body, video_section_title, video_section_subtitle, video_poster_url, video_url, services_data, instagram_username, instagram_images, whatsapp_number, enable_pickup, enable_delivery, created_at, updated_at, features_config
      FROM restaurants
      WHERE email = $1
    `;
    const result = await query<IRestaurant>(text, [email]);
    return result.length > 0 ? result[0] : null;
  }

  async findById(id: number): Promise<IRestaurant | null> {
    const text = `
      SELECT id, name, slug, email, password, primary_color, theme_mode, menu_mode, menu_pdf_url, logo_url, hero_image_url, hero_title, hero_subtitle, content_section_image, content_section_title, content_section_body, content_section_2_image, content_section_2_title, content_section_2_body, video_section_title, video_section_subtitle, video_poster_url, video_url, services_data, instagram_username, instagram_images, whatsapp_number, enable_pickup, enable_delivery, created_at, updated_at, features_config
      FROM restaurants
      WHERE id = $1
    `;
    const result = await query<IRestaurant>(text, [id]);
    return result.length > 0 ? result[0] : null;
  }

  /**
   * Obtiene todas las categorías de un restaurante ordenadas.
   */
  async findCategoriesByRestaurantId(restaurantId: number): Promise<ICategory[]> {
    const text = `
      SELECT id, restaurant_id, name, sort_order, created_at
      FROM categories
      WHERE restaurant_id = $1
      ORDER BY sort_order ASC
    `;
    return await query<ICategory>(text, [restaurantId]);
  }

  /**
   * Obtiene todos los productos de un restaurante.
   * Se podría filtrar por categoría, pero traer todos es eficiente para menús medianos
   * y permite armar el árbol en memoria (Service Layer) evitando N+1 queries.
   */
  async findProductsByRestaurantId(restaurantId: number): Promise<IProduct[]> {
    const text = `
      SELECT id, restaurant_id, category_id, name, description, price, image_url, is_available, created_at, updated_at
      FROM products
      WHERE restaurant_id = $1 AND is_available = true
    `;
    return await query<IProduct>(text, [restaurantId]);
  }
  async updateRestaurant(id: number, data: Partial<IRestaurant>): Promise<IRestaurant> {
    const {
      name, slug, whatsapp_number, primary_color, logo_url, hero_image_url,
      hero_title, hero_subtitle, content_section_image, content_section_title, content_section_body,
      content_section_2_image, content_section_2_title, content_section_2_body,
      video_section_title, video_section_subtitle, video_poster_url, video_url, services_data, instagram_username, instagram_images,
      enable_pickup, enable_delivery, theme_mode, menu_mode, menu_pdf_url
    } = data;

    // Note: A nicer way is dynamically building the query, but for explicit control:
    const result = await query<IRestaurant>(`
        UPDATE restaurants 
        SET name = COALESCE($2, name),
            slug = COALESCE($3, slug),
            whatsapp_number = COALESCE($4, whatsapp_number),
            primary_color = COALESCE($5, primary_color),
            logo_url = COALESCE($6, logo_url),
            hero_image_url = COALESCE($7, hero_image_url),
            hero_title = COALESCE($8, hero_title),
            hero_subtitle = COALESCE($9, hero_subtitle),
            content_section_image = COALESCE($10, content_section_image),
            content_section_title = COALESCE($11, content_section_title),
            content_section_body = COALESCE($12, content_section_body),
            content_section_2_image = COALESCE($24, content_section_2_image),
            content_section_2_title = COALESCE($25, content_section_2_title),
            content_section_2_body = COALESCE($26, content_section_2_body),
            video_section_title = COALESCE($13, video_section_title),
            video_section_subtitle = COALESCE($14, video_section_subtitle),
            video_poster_url = COALESCE($15, video_poster_url),
            video_url = COALESCE($16, video_url),
            services_data = COALESCE($17, services_data),
            instagram_username = COALESCE($18, instagram_username),
            instagram_images = COALESCE($19, instagram_images),
            enable_pickup = COALESCE($20, enable_pickup),
            enable_delivery = COALESCE($21, enable_delivery),
            updated_at = NOW(),
            features_config = COALESCE($22, features_config),
            theme_mode = COALESCE($23, theme_mode),
            menu_mode = COALESCE($27, menu_mode),
            menu_pdf_url = COALESCE($28, menu_pdf_url)
        WHERE id = $1
        RETURNING *;
    `, [
      id, name, slug, whatsapp_number, primary_color, logo_url, hero_image_url,
      hero_title, hero_subtitle, content_section_image, content_section_title, content_section_body,
      video_section_title, video_section_subtitle, video_poster_url, video_url,
      services_data ? JSON.stringify(services_data) : null,
      instagram_username,
      instagram_images ? JSON.stringify(instagram_images) : null,
      enable_pickup,
      enable_delivery,
      data.features_config ? JSON.stringify(data.features_config) : null,
      theme_mode,
      content_section_2_image, content_section_2_title, content_section_2_body,
      menu_mode, menu_pdf_url
    ]);
    return result[0];
  }

  // =====================
  // CATEGORY CRUD METHODS
  // =====================

  async createCategory(restaurantId: number, name: string): Promise<ICategory> {
    // Get max sort_order for this restaurant
    const maxOrderResult = await query<{ max: number | null }>(
      'SELECT MAX(sort_order) as max FROM categories WHERE restaurant_id = $1',
      [restaurantId]
    );
    const nextOrder = (maxOrderResult[0]?.max ?? 0) + 1;

    const result = await query<ICategory>(
      `INSERT INTO categories (restaurant_id, name, sort_order, created_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING *`,
      [restaurantId, name, nextOrder]
    );
    return result[0];
  }

  async updateCategory(id: number, restaurantId: number, data: { name?: string; sort_order?: number }): Promise<ICategory | null> {
    const result = await query<ICategory>(
      `UPDATE categories 
       SET name = COALESCE($3, name),
           sort_order = COALESCE($4, sort_order)
       WHERE id = $1 AND restaurant_id = $2
       RETURNING *`,
      [id, restaurantId, data.name, data.sort_order]
    );
    return result[0] || null;
  }

  async deleteCategory(id: number, restaurantId: number): Promise<boolean> {
    const result = await query(
      'DELETE FROM categories WHERE id = $1 AND restaurant_id = $2',
      [id, restaurantId]
    );
    return (result as unknown as { rowCount: number }).rowCount > 0;
  }

  async findCategoryById(id: number, restaurantId: number): Promise<ICategory | null> {
    const result = await query<ICategory>(
      'SELECT * FROM categories WHERE id = $1 AND restaurant_id = $2',
      [id, restaurantId]
    );
    return result[0] || null;
  }

  // =====================
  // PRODUCT CRUD METHODS
  // =====================

  async createProduct(restaurantId: number, data: {
    category_id: number;
    name: string;
    description?: string | null;
    price: number;
    image_url?: string | null;
  }): Promise<IProduct> {
    const result = await query<IProduct>(
      `INSERT INTO products (restaurant_id, category_id, name, description, price, image_url, is_available, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, true, NOW(), NOW())
       RETURNING *`,
      [restaurantId, data.category_id, data.name, data.description || null, data.price, data.image_url || null]
    );
    return result[0];
  }

  async updateProduct(id: number, restaurantId: number, data: {
    category_id?: number;
    name?: string;
    description?: string | null;
    price?: number;
    image_url?: string | null;
    is_available?: boolean;
  }): Promise<IProduct | null> {
    const result = await query<IProduct>(
      `UPDATE products 
       SET category_id = COALESCE($3, category_id),
           name = COALESCE($4, name),
           description = COALESCE($5, description),
           price = COALESCE($6, price),
           image_url = COALESCE($7, image_url),
           is_available = COALESCE($8, is_available),
           updated_at = NOW()
       WHERE id = $1 AND restaurant_id = $2
       RETURNING *`,
      [id, restaurantId, data.category_id, data.name, data.description, data.price, data.image_url, data.is_available]
    );
    return result[0] || null;
  }

  async deleteProduct(id: number, restaurantId: number): Promise<boolean> {
    const result = await query(
      'DELETE FROM products WHERE id = $1 AND restaurant_id = $2',
      [id, restaurantId]
    );
    return (result as unknown as { rowCount: number }).rowCount > 0;
  }

  async findProductById(id: number, restaurantId: number): Promise<IProduct | null> {
    const result = await query<IProduct>(
      'SELECT * FROM products WHERE id = $1 AND restaurant_id = $2',
      [id, restaurantId]
    );
    return result[0] || null;
  }

  async findAllProductsByRestaurantId(restaurantId: number): Promise<IProduct[]> {
    return await query<IProduct>(
      `SELECT * FROM products WHERE restaurant_id = $1 ORDER BY category_id, name`,
      [restaurantId]
    );
  }

  async findAll(): Promise<Pick<IRestaurant, 'id' | 'name' | 'slug' | 'email'>[]> {
    const text = 'SELECT id, name, slug, email FROM restaurants ORDER BY name ASC';
    const result = await query<IRestaurant>(text);
    return result;
  }

  // =====================
  // TENANT CREATION (TRANSACTIONAL)
  // =====================

  async createTenant(data: {
    name: string;
    slug: string;
    email: string; // Owner email
    password: string; // Plain text password (will be hashed)
  }): Promise<{ restaurant: IRestaurant; user: any }> {
    const client = await import('../config/db').then(m => m.default.connect());
    const bcrypt = await import('bcryptjs');

    try {
      await client.query('BEGIN');

      // 1. Hash Password
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(data.password, salt);

      // 2. Check if user exists, if so, use it? Or fail?
      // For now, fail if user exists to avoid complexity of "linking existing user as owner to new restaurant" in this specific flow,
      // OR better: if user exists, just link them. But let's assume new user for now for simplicity.
      // Actually, standard SaaS: check if email exists.
      const userCheck = await client.query('SELECT * FROM users WHERE email = $1', [data.email]);
      let userId: string;

      if (userCheck.rows.length > 0) {
        userId = userCheck.rows[0].id;
        // Optional: Update password? No.
      } else {
        const userInsert = await client.query(
          `INSERT INTO users (email, password_hash, full_name, system_role, created_at)
                   VALUES ($1, $2, $3, 'USER', NOW()) RETURNING id`,
          [data.email, hash, data.name + ' Owner']
        );
        userId = userInsert.rows[0].id;
      }

      // 3. Create Restaurant
      // NOTE: restaurants table has password column (legacy). 
      // We will store the SAME hash there for backward compatibility if needed, or dummy.
      // Let's store hash.
      const restInsert = await client.query(
        `INSERT INTO restaurants (
                  name, slug, email, password, primary_color, enable_pickup, enable_delivery, created_at, updated_at
              ) VALUES ($1, $2, $3, $4, '#000000', true, false, NOW(), NOW()) RETURNING *`,
        [data.name, data.slug, data.email, hash]
      );
      const restaurant = restInsert.rows[0];

      // 4. Link User to Restaurant as OWNER
      await client.query(
        `INSERT INTO user_tenants (user_id, restaurant_id, role, created_at)
               VALUES ($1, $2, 'OWNER', NOW())`,
        [userId, restaurant.id]
      );

      await client.query('COMMIT');
      return { restaurant, user: { id: userId, email: data.email } };

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}
