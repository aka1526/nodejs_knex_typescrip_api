import { BaseModel } from './BaseModel';
import type { OrderItem } from '../types/OrderItem';

export class OrderItemModel extends BaseModel {
    constructor() {
        super('order_items');
    }

    async createOrderItem(orderItemData: Omit<OrderItem, 'id'>) {
        const [orderItem] = await this.db(this.tableName)
            .insert(orderItemData)
            .returning('*');

        return orderItem;
    }

    async getOrderItems(orderId: number) {
        return this.db(this.tableName)
            .where({ order_id: orderId })
            .join('products', 'order_items.product_id', '=', 'products.id')
            .select('order_items.*', 'products.name', 'products.description');
    }
} 