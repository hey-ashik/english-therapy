const STORAGE_KEY = 'et_attribution';
const COOKIE_KEY = 'et_attribution';

function safeParse(value) {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

/**
 * Remembers where a visitor came from (landing page, referrer, UTM tags)
 * so lead submissions can be attributed to a campaign.
 */
export function captureAttribution() {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  const previous = safeParse(window.localStorage.getItem(STORAGE_KEY)) || {};
  const currentPage = `${window.location.pathname}${window.location.search}`;

  const attribution = {
    first_landing_page: previous.first_landing_page || currentPage,
    first_referrer: previous.first_referrer || document.referrer || '',
    last_landing_page: currentPage,
    utm_source: params.get('utm_source') || previous.utm_source || '',
    utm_medium: params.get('utm_medium') || previous.utm_medium || '',
    utm_campaign: params.get('utm_campaign') || previous.utm_campaign || '',
    utm_content: params.get('utm_content') || previous.utm_content || '',
    utm_term: params.get('utm_term') || previous.utm_term || '',
  };

  const serialized = JSON.stringify(attribution);
  try {
    window.localStorage.setItem(STORAGE_KEY, serialized);
    document.cookie = `${COOKIE_KEY}=${encodeURIComponent(serialized)}; Max-Age=${3600 * 24 * 180}; Path=/; SameSite=Lax`;
  } catch {
    /* storage unavailable (private mode) — ignore */
  }

  return attribution;
}

export function getAttribution() {
  if (typeof window === 'undefined') return {};
  return safeParse(window.localStorage.getItem(STORAGE_KEY)) || {};
}
