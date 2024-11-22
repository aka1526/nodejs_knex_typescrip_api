import { Request, Response, NextFunction } from 'express';
import { db } from '../config/database';

export const createProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const product = await db('products').insert(req.body).returning('*');
        res.status(201).json(product[0]);
    } catch (error) {
        next(error);
    }
};

export const getProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const products = await db('products').select('*');
        res.json(products);
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const product = await db('products')
            .where({ id: req.params.id })
            .first();
        
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        
        res.json(product);
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const product = await db('products')
            .where({ id: req.params.id })
            .update(req.body)
            .returning('*');
            
        if (!product.length) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        
        res.json(product[0]);
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const deleted = await db('products')
            .where({ id: req.params.id })
            .delete();
            
        if (!deleted) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }
        
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}; 