/**
 * Formats a date in Bangladesh time (Asia/Dhaka), e.g. "Sep 24, 2026, 1:24 PM".
 */
function dhakaTimestamp(date = new Date()) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Dhaka',
  }).format(date);
}

module.exports = { dhakaTimestamp };
