import { useEffect } from 'react';

import { SEO } from '../../data/seo.js';
import { BRAND, SITE_URL } from '../../data/site.js';

function setMeta(attribute, key, value) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);
}

/**
 * Updates <title>, description, Open Graph, Twitter and canonical tags per route.
 */
export default function SeoHead({ pathname }) {
  useEffect(() => {
    const meta = SEO[pathname] || SEO['/'];
    const url = `${SITE_URL}${pathname === '/' ? '/' : pathname}`;
    const imageAlt = `${BRAND.name} — ${BRAND.tagline}`;

    document.title = meta.title;
    setMeta('name', 'description', meta.description);
    setMeta('name', 'robots', 'index, follow');
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', BRAND.name);
    setMeta('property', 'og:title', meta.title);
    setMeta('property', 'og:description', meta.description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', BRAND.socialCover);
    setMeta('property', 'og:image:alt', imageAlt);
    setMeta('property', 'og:image:type', 'image/jpeg');
    setMeta('property', 'og:image:width', '1920');
    setMeta('property', 'og:image:height', '1080');
    setMeta('property', 'og:locale', 'en_US');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', meta.title);
    setMeta('name', 'twitter:description', meta.description);
    setMeta('name', 'twitter:image', BRAND.socialCover);
    setMeta('name', 'twitter:image:alt', imageAlt);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [pathname]);

  return null;
}
