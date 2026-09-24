const env = require('../config/env');
const logger = require('../utils/logger');

/**
 * Optionally forwards a submission to a Google Apps Script web app
 * (the classic "Google Sheets as a database" setup) as form-data.
 *
 * Enabled only when GOOGLE_SCRIPT_URL is set. Failures are logged, never thrown,
 * so a Sheets outage can never block a lead or an order.
 */
async function forwardToSheet(fields) {
  if (!env.googleScriptUrl) return { forwarded: false };

  try {
    const body = new URLSearchParams();
    Object.entries(fields).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      body.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
    });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(env.googleScriptUrl, {
      method: 'POST',
      body,
      redirect: 'follow',
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      logger.warn('Google Sheets forward returned a non-OK status', { status: response.status });
      return { forwarded: false };
    }
    return { forwarded: true };
  } catch (error) {
    logger.warn('Google Sheets forward failed', { error: error.message });
    return { forwarded: false };
  }
}

module.exports = { forwardToSheet };
