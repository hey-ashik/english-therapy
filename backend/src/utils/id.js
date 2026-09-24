const crypto = require('node:crypto');

function createId(prefix = 'ET') {
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `${prefix}-${Date.now().toString(36).toUpperCase()}-${random}`;
}

module.exports = { createId };
