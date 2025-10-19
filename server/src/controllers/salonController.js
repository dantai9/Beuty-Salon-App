import mongoose from 'mongoose';
import Salon from '../models/Salon.js';
import Review from '../models/Review.js';
import Appointment from '../models/Appointment.js';

export const listSalons = async (req, res, next) => {
  try {
    const { city, service, search } = req.query;
    const filter = {};

    if (city) {
      filter.city = new RegExp(city, 'i');
    }

    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
      ];
    }

    if (service) {
      filter['services.service'] = new RegExp(service, 'i');
    }

    const salons = await Salon.find(filter).populate('owner', 'name email');

    res.json({ salons });
  } catch (error) {
    next(error);
  }
};

export const getSalon = async (req, res, next) => {
  try {
    const salon = await Salon.findById(req.params.id).populate('owner', 'name email');
    if (!salon) {
      return res.status(404).json({ message: 'Salon not found.' });
    }

    const reviews = await Review.find({ salon: salon._id })
      .populate('client', 'name')
      .sort('-createdAt')
      .limit(10);

    res.json({ salon, reviews });
  } catch (error) {
    next(error);
  }
};

export const createSalon = async (req, res, next) => {
  try {
    const salon = await Salon.create({ ...req.body, owner: req.userId });
    res.status(201).json({ salon });
  } catch (error) {
    next(error);
  }
};

export const updateSalon = async (req, res, next) => {
  try {
    const salon = await Salon.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      req.body,
      { new: true }
    );
    if (!salon) {
      return res.status(404).json({ message: 'Salon not found or not owned by user.' });
    }
    res.json({ salon });
  } catch (error) {
    next(error);
  }
};

export const salonStats = async (req, res, next) => {
  try {
    const salonId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(salonId)) {
      return res.status(400).json({ message: 'Invalid salon id.' });
    }
    const objectId = new mongoose.Types.ObjectId(salonId);

    const [appointmentStats, reviewStats] = await Promise.all([
      Appointment.aggregate([
        { $match: { salon: objectId } },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ]),
      Review.aggregate([
        { $match: { salon: objectId } },
        {
          $group: {
            _id: null,
            averageRating: { $avg: '$rating' },
            reviewCount: { $sum: 1 },
          },
        },
      ]),
    ]);

    res.json({
      appointmentStats,
      reviewStats: reviewStats[0] || { averageRating: 0, reviewCount: 0 },
    });
  } catch (error) {
    next(error);
  }
};
