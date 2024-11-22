import { Router } from 'express';
import { protect } from '../middleware/auth';
import { 
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct 
} from '../controllers/productController';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router; 