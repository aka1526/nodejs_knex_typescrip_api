export interface Product {
    uuid?: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    category_id?: number;
    image_url?: string;
    created_at?: Date;
    updated_at?: Date;
} 