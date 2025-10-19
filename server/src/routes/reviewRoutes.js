import { Router } from 'express';
import { createReview, listSalonReviews } from '../controllers/reviewController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.get('/:id', listSalonReviews);
router.post('/', authenticate, createReview);

export default router;
