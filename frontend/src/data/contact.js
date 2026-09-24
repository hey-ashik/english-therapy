import { CONTACT } from './site.js';

/**
 * Contact page options.
 */
export const CONTACT_OPTIONS = [
  {
    title: 'Call the team',
    description: 'Speak with someone about courses, books or campus life.',
    href: CONTACT.phoneSecondary.href,
    label: CONTACT.phoneSecondary.label,
  },
  {
    title: 'Message on WhatsApp',
    description: 'Ask a quick question and get pointed in the right direction.',
    href: CONTACT.whatsapp,
    label: 'Start a conversation',
  },
  {
    title: 'Send an email',
    description: 'For partnerships, support and everything in between.',
    href: CONTACT.email.href,
    label: CONTACT.email.label,
  },
];
