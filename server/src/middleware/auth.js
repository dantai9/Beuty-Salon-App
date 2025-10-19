import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.cookies?.token;
    if (!authHeader) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    const token = authHeader.startsWith('Bearer ')
      ? authHeader.replace('Bearer ', '')
      : authHeader;

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;

    const user = await User.findById(req.userId).populate('salon');
    if (user) {
      req.userRole = user.role;
      req.userSalonId = user.salon?._id?.toString();
    }

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token.' });
    }
    next(error);
  }
};
