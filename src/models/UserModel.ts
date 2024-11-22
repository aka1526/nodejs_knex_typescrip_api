import { BaseModel } from './BaseModel';
import bcrypt from 'bcrypt';
import { generateUuid } from '../utils/generateUuid';

interface UserData {
    username: string;
    email: string;
    password: string;
    firstname?: string;
    lastname?: string;
    role?: 'admin' | 'user';
}

export class UserModel extends BaseModel {
    constructor() {
        super('users');
    }

    async findByUuid(uuid: string) {
        return await this.findOne({ uuid });
    }

    async findByEmail(email: string) {
        return await this.findOne({ email });
    }

    async createUser(userData: UserData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const uuid = generateUuid();
        
        const userdata= await this.db(this.tableName).insert({
            ...userData,
            uuid,
            password: hashedPassword,
            role: userData.role || 'user'
        });

        return userdata;
    }

    async validatePassword(userId: number, password: string) {
        const user = await this.findById(userId);
        if (!user) return false;
        return await bcrypt.compare(password, user.password);
    }

    async findByUuidWithoutPassword(uuid: string) {
        const user = await this.db(this.tableName)
            .select(['id', 'uuid', 'username', 'email', 'firstname', 'lastname', 'role', 'created_at'])
            .where({ uuid })
            .first();
        return user;
    }

    async findByUsername(username: string) {
        return await this.db(this.tableName)
            .where({ username })
            .first();
    }

    async findById(id: number) {
        const user = await this.db(this.tableName)
            .where({ id })
            .first();
        return user;
    }
} 