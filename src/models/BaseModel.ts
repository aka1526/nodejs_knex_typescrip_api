import { db } from '../config/database';
import { Knex } from 'knex';

export class BaseModel {
    protected tableName: string;
    protected db: Knex;

    constructor(tableName: string) {
        this.tableName = tableName;
        this.db = db;
    }

    async findByUuid(uuid: string) {
        return await this.db(this.tableName).where({ uuid }).first();
    }
    async findById(id: number) {
        return await this.db(this.tableName).where({ id }).first();
    }

    async findOne(filter: object) {
        return await this.db(this.tableName).where(filter).first();
    }

    async findAll(filter: object = {}) {
        return await this.db(this.tableName).where(filter);
    }

    async create(data: object) {
        const [id] = await this.db(this.tableName).insert(data);
        return id;
    }

    async update(id: number, data: object) {
        return await this.db(this.tableName)
            .where({ id })
            .update(data);
    }

    async delete(id: number) {
        return await this.db(this.tableName)
            .where({ id })
            .delete();
    }
} 