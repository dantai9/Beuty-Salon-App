import { Router } from 'express';
import {
  createAppointment,
  listAppointments,
  updateAppointmentStatus,
} from '../controllers/appointmentController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);
router.post('/', createAppointment);
router.get('/', listAppointments);
router.patch('/:id', updateAppointmentStatus);

export default router;
