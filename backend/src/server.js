const env = require('./config/env');
const { createApp } = require('./app');
const logger = require('./utils/logger');

const app = createApp();

const server = app.listen(env.port, () => {
  logger.info(`English Therapy server listening on port ${env.port} (${env.nodeEnv})`);
});

function shutdown(signal) {
  logger.info(`${signal} received, shutting down…`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10000).unref();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
