const { HttpError } = require('../utils/httpError');

const PHONE_PATTERN = /^\+?[0-9\s-]{8,20}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value, max = 500) {
  if (value === undefined || value === null) return '';
  return String(value).trim().slice(0, max);
}

/**
 * Builds a validator middleware from a simple schema:
 *   { name: { required: true, max: 120 }, phone: { required: true, type: 'phone' } }
 * Cleaned values are placed on req.validated.
 */
function validate(schema) {
  return (req, _res, next) => {
    const errors = {};
    const validated = {};

    Object.entries(schema).forEach(([field, rules]) => {
      const value = clean(req.body?.[field], rules.max);

      if (rules.required && !value) {
        errors[field] = 'This field is required.';
        return;
      }
      if (value && rules.type === 'phone' && !PHONE_PATTERN.test(value)) {
        errors[field] = 'Please enter a valid phone number.';
        return;
      }
      if (value && rules.type === 'email' && !EMAIL_PATTERN.test(value)) {
        errors[field] = 'Please enter a valid email address.';
        return;
      }
      if (rules.type === 'number') {
        const number = Number(value);
        if (value && Number.isNaN(number)) {
          errors[field] = 'Please enter a valid number.';
          return;
        }
        validated[field] = value ? number : rules.default ?? 0;
        return;
      }
      if (rules.oneOf && value && !rules.oneOf.includes(value)) {
        errors[field] = `Must be one of: ${rules.oneOf.join(', ')}.`;
        return;
      }
      validated[field] = value;
    });

    if (Object.keys(errors).length > 0) {
      return next(new HttpError(422, 'Please check the highlighted fields.', errors));
    }

    req.validated = validated;
    return next();
  };
}

module.exports = { validate };
