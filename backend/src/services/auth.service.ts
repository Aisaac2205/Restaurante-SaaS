import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { ILoginResponse, IAuthPayload } from '../interfaces/models';

export class AuthService {
    private userRepo: UserRepository;
    private readonly JWT_SECRET = process.env.JWT_SECRET || 'changeme_to_something_secure';
    private readonly JWT_EXPIRES_IN = '24h';

    constructor() {
        this.userRepo = new UserRepository();
    }

    async login(email: string, password: string): Promise<ILoginResponse> {
        console.log(`[AuthService] Attempting login for user: ${email}`);

        // 1. Buscar usuario en tabla USERS
        const user = await this.userRepo.findByEmail(email);

        if (!user) {
            console.log('[AuthService] User not found');
            throw new Error('InvalidCredentials');
        }

        // 2. Verificar password
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            console.log('[AuthService] Password mismatch');
            throw new Error('InvalidCredentials');
        }

        // 3. Buscar Tenants (Restaurantes) asociados
        const tenants = await this.userRepo.findUserTenants(user.id);

        if (tenants.length === 0 && user.system_role !== 'SUPER_ADMIN') {
            throw new Error('NoTenantsAssigned');
        }

        // 4. Determinar Contexto Inicial (Por defecto el primer restaurante)
        // TODO: En el futuro, retornar lista de tenants y dejar que el usuario elija si tiene > 1
        const activeTenant = tenants[0];

        if (!activeTenant) {
            throw new Error('NoActiveTenant'); // Should handle super admin differently later
        }

        // 5. Generar Token Híbrido (User + Active Tenant Context)
        // 5. Generar Token Híbrido (User + Active Tenant Context)
        const payload: IAuthPayload = {
            userId: user.id,
            role: activeTenant.role,
            system_role: user.system_role,
            id: activeTenant.restaurant_id,
            slug: activeTenant.restaurant_slug,
            email: user.email
        };

        const token = jwt.sign(payload, this.JWT_SECRET, { expiresIn: this.JWT_EXPIRES_IN });

        // 6. Retornar respuesta
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                system_role: user.system_role
            },
            restaurant: {
                id: activeTenant.restaurant_id,
                name: activeTenant.restaurant_name,
                slug: activeTenant.restaurant_slug,
                email: user.email, // Contact email
                role: activeTenant.role
            }
        };
    }
}
