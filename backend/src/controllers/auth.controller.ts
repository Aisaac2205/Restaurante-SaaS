import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ error: 'EmailAndPasswordRequired' });
                return;
            }

            const result = await this.authService.login(email, password);
            res.json(result);

        } catch (error: unknown) {
            if (error instanceof Error && error.message === 'InvalidCredentials') {
                res.status(401).json({ error: 'InvalidCredentials' });
            } else {
                console.error('Login error:', error);
                res.status(500).json({ error: 'InternalServerError' });
            }
        }
    };
}
