import { captureAttribution } from './attribution.js';

const GTM_ID = import.meta.env.VITE_GTM_ID || '';
const FB_PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID || '';

let initialised = false;

/**
 * Push a custom event to Google Tag Manager's dataLayer and Meta Pixel.
 */
export function trackEvent(eventName, payload = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...payload });
  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', eventName, payload);
  }
}

/**
 * Standard "Lead" conversion event (GTM + Meta Pixel).
 */
export function trackLead(contentName, extra = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'Lead', content_name: contentName, ...extra });
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', { content_name: contentName, ...extra });
  }
}

export function trackPageView(pagePath) {
  captureAttribution();
  trackEvent('page_view', { page_path: pagePath, page_title: document.title });
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'PageView');
  }
}

/**
 * Loads Google Tag Manager and the Meta Pixel once.
 */
export function initAnalytics() {
  if (initialised || typeof window === 'undefined') return;
  initialised = true;
  captureAttribution();

  window.dataLayer = window.dataLayer || [];

  if (GTM_ID && !document.querySelector('[data-english-therapy-gtm]')) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    const script = document.createElement('script');
    script.async = true;
    script.dataset.englishTherapyGtm = 'true';
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}`;
    document.head.appendChild(script);
  }

  if (FB_PIXEL_ID && typeof window.fbq !== 'function') {
    window.fbq = function fbq() {
      if (window.fbq.callMethod) {
        window.fbq.callMethod.apply(window.fbq, arguments);
      } else {
        window.fbq.queue.push(arguments);
      }
    };
    window.fbq.push = window.fbq;
    window.fbq.loaded = true;
    window.fbq.version = '2.0';
    window.fbq.queue = [];

    const script = document.createElement('script');
    script.async = true;
    script.dataset.englishTherapyPixel = 'true';
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);

    window.fbq('init', FB_PIXEL_ID);
    window.fbq('track', 'PageView');
  }
}
