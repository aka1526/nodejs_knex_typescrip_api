import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// เพิ่ม interface สำหรับ extend Request type
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                uuid: string;
                username: string;
            }
        }
    }
}

export const protect = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const token = req.cookies.accessToken;

        if (!token) {
            res.status(401).json({ message: 'Not authorized' });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            id: number;
            uuid: string;
            username: string;
        };

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized' });
    }
};