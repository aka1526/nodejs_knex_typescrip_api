export interface Order {
    uuid?: string;
    order_number?: string;
    user_id: number;
    total_amount: number;
    status?: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
    created_at?: Date;
    updated_at?: Date;
} 