import { Router } from 'express';
import {
  createSalon,
  getSalon,
  listSalons,
  salonStats,
  updateSalon,
} from '../controllers/salonController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/', listSalons);
router.get('/:id', getSalon);
router.get('/:id/stats', authenticate, salonStats);
router.post('/', authenticate, createSalon);
router.patch('/:id', authenticate, updateSalon);

export default router;
