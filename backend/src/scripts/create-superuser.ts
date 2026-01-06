import { query } from '../config/db';
import bcrypt from 'bcryptjs';

const createSuperUser = async () => {
    try {
        console.log('Creating Super Admin...');

        const email = 'admin@saas.com';
        const password = 'admin123'; // Default password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 1. Insert User
        const userResult = await query<{ id: string }>(`
            INSERT INTO users (email, password_hash, full_name, system_role)
            VALUES ($1, $2, 'Super Admin', 'SUPER_ADMIN')
            ON CONFLICT (email) 
            DO UPDATE SET system_role = 'SUPER_ADMIN', password_hash = $2
            RETURNING id;
        `, [email, hashedPassword]);

        const userId = userResult[0].id;
        console.log(`User created/updated with ID: ${userId}`);

        // 2. Link to ALL Restaurants (so they appear in dashboard)
        // Check existing restaurants
        const restaurants = await query<{ id: number }>('SELECT id FROM restaurants');

        for (const r of restaurants) {
            await query(`
                INSERT INTO user_tenants (user_id, restaurant_id, role)
                VALUES ($1, $2, 'OWNER')
                ON CONFLICT (user_id, restaurant_id) DO NOTHING
            `, [userId, r.id]);
        }

        console.log(`Linked Super Admin to ${restaurants.length} restaurants.`);
        process.exit(0);

    } catch (error) {
        console.error('Failed:', error);
        process.exit(1);
    }
};

createSuperUser();
