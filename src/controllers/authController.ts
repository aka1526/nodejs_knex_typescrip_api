import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/UserModel';
import { RefreshTokenModel } from '../models/RefreshTokenModel';
import jwt from 'jsonwebtoken';

const userModel = new UserModel();
const tokenModel = new RefreshTokenModel();

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { username, email, password, firstname, lastname } = req.body;

        const existingUser = await userModel.findByUsername(username) 
            || await userModel.findByEmail(email);

        if (existingUser) {
            res.status(400).json({ message: 'Username or email already exists' });
            return;
        }

        const newUser = await userModel.createUser({
            username,
            email,
            password,
            firstname,
            lastname
        });

        const user = await userModel.findById(newUser);

        res.status(201).json({ 
            message: 'User registered successfully',
            user: {
                uuid: user.uuid,
                username: user.username,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.role,
                created_at: user.created_at
            }
        });
    } catch (error) {
        next(error);
    }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { username, email, password } = req.body;
        
        const user = username 
            ? await userModel.findByUsername(username)
            : await userModel.findByEmail(email);

        if (!user || !await userModel.validatePassword(user.id, password)) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const accessToken = jwt.sign(
            { 
                id: user.id,
                uuid: user.uuid,
                username: user.username 
            },
            process.env.JWT_SECRET!,
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { id: user.id },
            process.env.REFRESH_TOKEN_SECRET!,
            { expiresIn: '7d' }
        );

        await tokenModel.createToken({
            user_id: user.id,
            token: refreshToken
        });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });

        res.json({
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
            },
            token: accessToken
        });
    } catch (error) {
        next(error);
    }
};

export const refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const refreshToken = req.cookies.refreshToken;
        
        if (!refreshToken) {
            res.status(401).json({ message: 'Refresh token required' });
            return;
        }

        const tokenRecord = await tokenModel.findByToken(refreshToken);

        if (!tokenRecord) {
            res.status(401).json({ message: 'Invalid refresh token' });
            return;
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as any;
        
        const accessToken = jwt.sign(
            { id: decoded.id },
            process.env.JWT_SECRET!,
            { expiresIn: '15m' }
        );

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60 * 1000
        });

        res.json({ message: 'Token refreshed' });
    } catch (error) {
        next(error);
    }
};

export const logout = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (refreshToken) {
            await tokenModel.deleteByToken(refreshToken);
        }

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
}; 