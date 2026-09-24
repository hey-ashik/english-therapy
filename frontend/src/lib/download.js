import { trackEvent } from './analytics.js';

/**
 * Triggers a browser download for a file URL.
 */
export function downloadFile(url, fileName) {
  trackEvent('freebie_download', { file_name: fileName });
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.target = '_blank';
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  link.remove();
}
