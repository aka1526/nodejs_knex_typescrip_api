import { BaseModel } from './BaseModel';
import type { Order } from '../types/Order';
import { generateUuid } from '../utils/generateUuid';

export class OrderModel extends BaseModel {
    constructor() {
        super('orders');
    }

    async createOrder(orderData: Omit<Order, 'id' | 'uuid'>) {
        const uuid = generateUuid();
        
        const [order] = await this.db(this.tableName)
            .insert({
                ...orderData,
                uuid,
                status: orderData.status || 'pending'
            })
            .returning('*');

        return order;
    }

    async getOrdersByUserId(userId: number) {
        return this.db(this.tableName)
            .where({ user_id: userId })
            .orderBy('created_at', 'desc');
    }
} 