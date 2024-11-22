import { Request, Response, NextFunction } from 'express';
import { db } from '../config/database';

export const getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const user = await db('users')
            .select('id', 'username', 'email', 'created_at')
            .where({ id: req.user?.id })
            .first();

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
}; 