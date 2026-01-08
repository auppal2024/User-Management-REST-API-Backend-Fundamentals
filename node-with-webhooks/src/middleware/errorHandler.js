const logger = require('../logger');

const errorHandler = (err, req, res, next) => {
  logger.error('An error occurred', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
  });

  // Don't leak error details in production, but for learning, include stack
  const isDevelopment = process.env.NODE_ENV !== 'production';

  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      ...(isDevelopment && { stack: err.stack }),
    },
  });
};

module.exports = errorHandler;