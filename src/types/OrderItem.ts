export interface OrderItem {
    id?: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: number;
    created_at?: Date;
    updated_at?: Date;
} 