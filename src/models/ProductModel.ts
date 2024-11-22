import { generateUuid } from '../utils/generateUuid';
import { BaseModel } from './BaseModel';
import type { Product } from '../types/Product';

export class ProductModel extends BaseModel {
    async createProduct(productData: Product) {
        const uuid = generateUuid();
        
        const [id] = await this.db(this.tableName).insert({
            ...productData,
            uuid,
            status: 'active'
        });

        return id;
    }
} 