import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IAuthPayload } from '../interfaces/models';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme_to_something_secure';

// Extend Express Request to include user
declare global {
    namespace Express {
        interface Request {
            user?: IAuthPayload;
        }
    }
}

export const validateJWT = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

    if (!token) {
        res.status(401).json({ error: 'AccessDenied' });
        return;
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET) as IAuthPayload;
        req.user = verified;
        next();
    } catch (err) {
        console.error('JWT Verification Error:', err);
        res.status(401).json({ error: 'InvalidToken' });
    }
};
