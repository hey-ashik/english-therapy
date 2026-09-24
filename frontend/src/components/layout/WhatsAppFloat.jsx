import { CONTACT } from '../../data/site.js';
import { trackEvent } from '../../lib/analytics.js';

export default function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent('whatsapp_click', { placement: 'floating_footer' })}
    >
      <span>Chat on WhatsApp</span>
      <strong aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.8L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.3h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.5-8.3Zm-8.3 18.1h-.1c-1.7 0-3.4-.5-4.8-1.3l-.3-.2-3.8 1 1-3.7-.2-.3a9.8 9.8 0 0 1-1.5-5.2C2.5 6.4 6.9 2 12.2 2c2.6 0 5.1 1 6.9 2.9a9.7 9.7 0 0 1 2.8 6.9c0 5.4-4.3 9.8-9.7 9.8Zm5.4-7.3c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.8 1.1-.2.2-.3.2-.6.1-1.7-.8-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.6.1-.2.1-.4 0-.6l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1-1.1 2.4s1.1 2.8 1.2 3c.1.2 2.2 3.4 5.3 4.7 2 .9 2.8 1 3.8.8.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.1-1.3-.2-.2-.5-.3-.8-.5Z"
            fill="currentColor"
          />
        </svg>
      </strong>
    </a>
  );
}
