export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`,
  });
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error(err.stack || err.message || err);

  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal server error',
    message:
      process.env.NODE_ENV === 'development'
        ? err.message || 'Internal server error'
        : 'Internal server error',
  });
};

export default errorHandler;
