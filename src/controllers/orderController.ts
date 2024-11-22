import { Request, Response, NextFunction } from 'express';
import { OrderModel } from '../models/OrderModel';
import { OrderItemModel } from '../models/OrderItemModel';
import { OrderItem } from '../types/OrderItem';

const orderModel = new OrderModel();
const orderItemModel = new OrderItemModel();

export const createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { items, ...orderData } = req.body;
        
        // Create order
        const order = await orderModel.createOrder({
            ...orderData,
            user_id: req.user?.id
        });

        // Create order items
        if (items && items.length > 0) {
            await Promise.all(
                items.map((item: OrderItem) => 
                    orderItemModel.createOrderItem({
                        ...item,
                        order_id: order.id
                    })
                )
            );
        }

        const orderItems = await orderItemModel.getOrderItems(order.id);
        
        res.status(201).json({
            ...order,
            items: orderItems
        });
    } catch (error) {
        next(error);
    }
};

export const getOrders = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.user?.id) {
            throw new Error('User ID is required');
        }
        const orders = await orderModel.getOrdersByUserId(req.user.id);
        res.json(orders);
    } catch (error) {
        next(error);
    }
};