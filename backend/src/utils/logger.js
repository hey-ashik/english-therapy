/* Minimal structured logger (stdout/stderr) so hosting dashboards can capture output. */

function format(level, message, meta) {
  const line = `[${new Date().toISOString()}] ${level.toUpperCase()} ${message}`;
  return meta ? `${line} ${JSON.stringify(meta)}` : line;
}

module.exports = {
  info: (message, meta) => console.log(format('info', message, meta)),
  warn: (message, meta) => console.warn(format('warn', message, meta)),
  error: (message, meta) => console.error(format('error', message, meta)),
};
