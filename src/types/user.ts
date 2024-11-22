export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    role: 'admin' | 'user';
    created_at: Date;
    updated_at: Date;
} 