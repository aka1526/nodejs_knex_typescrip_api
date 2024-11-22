import { Router } from 'express';
import { loginValidator, registerValidator } from '../middleware/validator';
import { limiter } from '../middleware/rateLimiter';
import {
    register,
    login,
    refreshToken,
    logout
} from '../controllers/authController';

const router = Router();

router.post('/register', registerValidator, register);
router.post('/login', limiter, loginValidator, login);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);

export default router;