import { BaseModel } from './BaseModel';

interface TokenData {
    user_id: number;
    token: string;
}

export class RefreshTokenModel extends BaseModel {
    constructor() {
        super('refresh_tokens');
    }

    async createToken(tokenData: TokenData) {
        return await this.create(tokenData);
    }

    async findByToken(token: string) {
        return await this.findOne({ token });
    }

    async deleteByUserId(userId: number) {
        return await this.db(this.tableName)
            .where({ user_id: userId })
            .delete();
    }

    async deleteByToken(token: string) {
        return await this.db(this.tableName)
            .where({ token })
            .delete();
    }
} 