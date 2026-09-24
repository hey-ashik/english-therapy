const env = require('../config/env');
const { HttpError } = require('../utils/httpError');

/**
 * Protects read endpoints (listing leads / orders) with a shared API key.
 * Send it as `x-api-key: <ADMIN_API_KEY>` or `?key=<ADMIN_API_KEY>`.
 */
function requireAdminKey(req, _res, next) {
  if (!env.adminApiKey) {
    return next(new HttpError(503, 'Admin access is disabled. Set ADMIN_API_KEY to enable it.'));
  }
  const provided = req.get('x-api-key') || req.query.key;
  if (provided !== env.adminApiKey) {
    return next(new HttpError(401, 'Invalid or missing API key.'));
  }
  return next();
}

module.exports = { requireAdminKey };
