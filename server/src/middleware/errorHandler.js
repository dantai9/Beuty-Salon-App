export const notFound = (req, res, next) => {
  res.status(404).json({ message: 'Route not found.' });
};

export const errorHandler = (error, req, res, next) => {
  console.error(error);
  const status = error.status || 500;
  res.status(status).json({
    message: error.message || 'Internal server error',
    stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
  });
};
