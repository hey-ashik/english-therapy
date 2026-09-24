const path = require('node:path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const BACKEND_ROOT = path.resolve(__dirname, '../..');

function resolveFromBackend(value, fallback) {
  return path.resolve(BACKEND_ROOT, value || fallback);
}

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: (process.env.NODE_ENV || 'development') === 'production',
  port: Number(process.env.PORT) || 5000,
  corsOrigins: (process.env.CORS_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  frontendDist: resolveFromBackend(process.env.FRONTEND_DIST, '../frontend/dist'),
  dataDir: resolveFromBackend(process.env.DATA_DIR, './data'),
  googleScriptUrl: process.env.GOOGLE_SCRIPT_URL || '',
  adminApiKey: process.env.ADMIN_API_KEY || '',
};

module.exports = env;
