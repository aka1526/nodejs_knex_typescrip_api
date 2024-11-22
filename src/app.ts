import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import { limiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';
// Commented out since file doesn't exist yet
import { protect } from './middleware/auth';

import authRoute from './routes/authRoute';
import orderRoutes from './routes/orderRoutes';
import userRoute from './routes/userRoute'; 
import productRoutes from './routes/productRoutes';
import orderItemRoutes from './routes/orderItemRoutes';

dotenv.config();

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(limiter);

// Basic Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/auth', authRoute);
app.use('/users', protect, userRoute);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/order-items', orderItemRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});