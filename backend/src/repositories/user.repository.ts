import { query } from '../config/db';

export interface IUser {
    id: string;
    email: string;
    password_hash: string;
    full_name: string;
    system_role: 'SUPER_ADMIN' | 'USER';
    created_at: Date;
}

export interface IUserTenant {
    user_id: string;
    restaurant_id: number;
    role: 'OWNER' | 'MANAGER' | 'STAFF';
    restaurant_name: string;
    restaurant_slug: string;
}

export class UserRepository {
    async findByEmail(email: string): Promise<IUser | null> {
        const text = 'SELECT * FROM users WHERE email = $1';
        const result = await query<IUser>(text, [email]);
        return result[0] || null;
    }

    async findById(id: string): Promise<IUser | null> {
        const text = 'SELECT * FROM users WHERE id = $1';
        const result = await query<IUser>(text, [id]);
        return result[0] || null;
    }

    async findUserTenants(userId: string): Promise<IUserTenant[]> {
        const text = `
            SELECT ut.user_id, ut.restaurant_id, ut.role, r.name as restaurant_name, r.slug as restaurant_slug
            FROM user_tenants ut
            JOIN restaurants r ON r.id = ut.restaurant_id
            WHERE ut.user_id = $1
        `;
        return await query<IUserTenant>(text, [userId]);
    }
}
