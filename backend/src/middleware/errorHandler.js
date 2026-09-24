const env = require('../config/env');
const logger = require('../utils/logger');
const { HttpError } = require('../utils/httpError');

function notFound(req, _res, next) {
  next(new HttpError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}

// eslint-disable-next-line no-unused-vars
function errorHandler(error, _req, res, _next) {
  const status = error instanceof HttpError ? error.status : error.status || 500;
  const message = status >= 500 && env.isProduction ? 'Something went wrong. Please try again.' : error.message;

  if (status >= 500) {
    logger.error('Unhandled error', { message: error.message, stack: error.stack });
  }

  res.status(status).json({
    ok: false,
    message,
    ...(error.details ? { errors: error.details } : {}),
  });
}

module.exports = { notFound, errorHandler };
