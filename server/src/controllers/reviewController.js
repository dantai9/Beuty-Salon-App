import Review from '../models/Review.js';
import Salon from '../models/Salon.js';

export const createReview = async (req, res, next) => {
  try {
    const { salonId, rating, comment, visitDate } = req.body;
    if (!salonId || !rating) {
      return res.status(400).json({ message: 'Salon and rating are required.' });
    }

    const salon = await Salon.findById(salonId);
    if (!salon) {
      return res.status(404).json({ message: 'Salon not found.' });
    }

    const review = await Review.create({
      salon: salonId,
      client: req.userId,
      rating,
      comment,
      visitDate,
    });

    const stats = await Review.aggregate([
      { $match: { salon: salon._id } },
      {
        $group: {
          _id: '$salon',
          averageRating: { $avg: '$rating' },
          reviewCount: { $sum: 1 },
        },
      },
    ]);

    const { averageRating = 0, reviewCount = 0 } = stats[0] || {};
    salon.rating = { average: averageRating, count: reviewCount };
    await salon.save();

    res.status(201).json({ review });
  } catch (error) {
    next(error);
  }
};

export const listSalonReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ salon: req.params.id })
      .populate('client', 'name')
      .sort('-createdAt');
    res.json({ reviews });
  } catch (error) {
    next(error);
  }
};
