import { Router } from 'express';
import { createOrder, getOrders } from '../controllers/orderController';
import { protect } from '../middleware/auth';

const router = Router();

  // Protect all order route
router.post('/',protect, createOrder);
router.get('/',protect, getOrders);


 

export default router; 