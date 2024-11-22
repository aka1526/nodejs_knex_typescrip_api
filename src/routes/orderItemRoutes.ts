import { Router } from 'express';
import { protect } from '../middleware/auth';
import {
    createOrderItem,
    getOrderItems,
    getOrderItemById,
    updateOrderItem,
    deleteOrderItem
} from '../controllers/orderItemController';

const router = Router();

router.get('/', protect, getOrderItems);
router.get('/:id', protect, getOrderItemById);
router.post('/', protect, createOrderItem);
router.put('/:id', protect, updateOrderItem);
router.delete('/:id', protect, deleteOrderItem);

export default router; 