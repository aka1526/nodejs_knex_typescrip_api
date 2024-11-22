import { Request, Response, NextFunction } from 'express';
import { db } from '../config/database';

export const createOrderItem = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const orderItem = await db('order_items')
            .insert({
                order_id: req.params.orderId,
                ...req.body
            })
            .returning('*');
        res.status(201).json(orderItem[0]);
    } catch (error) {
        next(error);
    }
};

export const getOrderItems = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const orderItems = await db('order_items')
            .select('*')
            .where({ order_id: req.params.orderId });
        
        res.json(orderItems);
    } catch (error) {
        next(error);
    }
};

export const getOrderItemById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const orderItem = await db('order_items')
            .where({ id: req.params.id })
            .first();
        
        if (!orderItem) {
            res.status(404).json({ message: 'Order item not found' });
            return;
        }
        
        res.json(orderItem);
    } catch (error) {
        next(error);
    }
};

export const updateOrderItem = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const orderItem = await db('order_items')
            .where({ id: req.params.id })
            .update(req.body)
            .returning('*');
            
        if (!orderItem.length) {
            res.status(404).json({ message: 'Order item not found' });
            return;
        }
        
        res.json(orderItem[0]);
    } catch (error) {
        next(error);
    }
};

export const deleteOrderItem = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const deleted = await db('order_items')
            .where({ id: req.params.id })
            .delete();
            
        if (!deleted) {
            res.status(404).json({ message: 'Order item not found' });
            return;
        }
        
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}; 