import Appointment from '../models/Appointment.js';
import Salon from '../models/Salon.js';

export const createAppointment = async (req, res, next) => {
  try {
    const { salonId, service, scheduledAt, notes } = req.body;
    if (!salonId || !service || !scheduledAt) {
      return res.status(400).json({ message: 'Salon, service and date are required.' });
    }

    const salon = await Salon.findById(salonId);
    if (!salon) {
      return res.status(404).json({ message: 'Salon not found.' });
    }

    const appointment = await Appointment.create({
      salon: salonId,
      client: req.userId,
      service,
      scheduledAt,
      notes,
    });

    res.status(201).json({ appointment });
  } catch (error) {
    next(error);
  }
};

export const listAppointments = async (req, res, next) => {
  try {
    const filter = {};
    if (req.userRole === 'salon') {
      filter.salon = req.userSalonId;
    } else {
      filter.client = req.userId;
    }

    const appointments = await Appointment.find(filter)
      .populate('salon', 'name city')
      .populate('client', 'name email')
      .sort('scheduledAt');

    res.json({ appointments });
  } catch (error) {
    next(error);
  }
};

export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status update.' });
    }

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }

    if (req.userRole === 'salon') {
      if (appointment.salon.toString() !== req.userSalonId) {
        return res.status(403).json({ message: 'Not authorized to update this appointment.' });
      }
    } else if (appointment.client.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this appointment.' });
    }

    appointment.status = status;
    await appointment.save();

    res.json({ appointment });
  } catch (error) {
    next(error);
  }
};
