const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(`Unhandled Error: ${err.message}`);
  res.status(500).json({ message: 'An unexpected error occurred' });
};

module.exports = errorHandler;