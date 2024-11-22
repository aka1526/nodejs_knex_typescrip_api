import { Router } from 'express';
import { protect } from '../middleware/auth';
import { getProfile } from '../controllers/userController';

const router = Router();

router.get('/profile', protect, getProfile);

export default router;
