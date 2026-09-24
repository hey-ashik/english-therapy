import { Link } from 'react-router-dom';

import BrandLockup from './BrandLockup.jsx';
import WhatsAppFloat from './WhatsAppFloat.jsx';
import { BRAND, CONTACT, NAV_LINKS } from '../../data/site.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <BrandLockup light />
          <p className="footer-copy">
            English is your entrance to a bigger you. Learn with practice, express with confidence, and keep
            becoming.
          </p>
          <a className="footer-community-link" href={CONTACT.whatsapp}>
            Join the English Therapy community <span>↗</span>
          </a>
        </div>

        <div className="footer-links">
          <span className="eyebrow">Explore</span>
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="footer-links footer-contact">
          <span className="eyebrow">Contact</span>
          <a href={CONTACT.phonePrimary.href}>{CONTACT.phonePrimary.label}</a>
          <a href={CONTACT.phoneSecondary.href}>{CONTACT.phoneSecondary.label}</a>
          <a href={CONTACT.phoneTertiary.href}>{CONTACT.phoneTertiary.label}</a>
          <a href={CONTACT.email.href}>{CONTACT.email.label}</a>
          <p>
            {CONTACT.address[0]}
            <br />
            {CONTACT.address[1]}
            <br />
            {CONTACT.address[2]}
          </p>
        </div>

        <div className="footer-map">
          <p className="eyebrow">Find us</p>
          <iframe title="English Therapy location" src={CONTACT.mapEmbed} loading="lazy" />
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} English Therapy</span>
        <span>All rights reserved · {BRAND.motto}</span>
      </div>

      <WhatsAppFloat />
    </footer>
  );
}
