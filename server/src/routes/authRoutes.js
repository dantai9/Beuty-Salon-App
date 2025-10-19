import { Router } from 'express';
import { login, profile, register, updateProfile } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, profile);
router.patch('/me', authenticate, updateProfile);

export default router;
